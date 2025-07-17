#!/usr/bin/env python3
"""
Complete character class extractor for Fabula Ultima PDFs
Extracts all character classes from all PDFs in the directory
"""

import os
import re
import json
from pathlib import Path
import PyPDF2
from typing import Dict, List, Any

class FabulaUltimaClassExtractor:
    def __init__(self, directory: str):
        self.directory = Path(directory)
        self.classes = {}
        self.pdf_files = []
        self.current_source = ""
        
    def find_pdfs(self):
        """Find all PDF files in the directory"""
        self.pdf_files = list(self.directory.glob("*.pdf"))
        print(f"Found {len(self.pdf_files)} PDF files:")
        for pdf in self.pdf_files:
            print(f"  - {pdf.name}")
    
    def extract_text_from_pdf(self, pdf_path: Path) -> str:
        """Extract text from a PDF file"""
        text = ""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text()
        except Exception as e:
            print(f"Error reading {pdf_path}: {e}")
            return ""
        return text
    
    def extract_core_classes(self, text: str) -> Dict[str, Any]:
        """Extract core rulebook classes"""
        classes = {}
        
        # Look for class sections - typically have "ALSO:" prefix
        class_pattern = r'(ARCANIST|DARKBLADE|ELEMENTALIST|ENTROPIST|FURY|GUARDIAN|LOREMASTER|ORATOR|PILOT|ROGUE|SHARPSHOOTER|SPIRITIST|TINKERER|WAYFARER|WEAPONMASTER)(?:\s+FREE\s+BENEFITS|\s+SKILLS|\s*\n)'
        
        matches = re.finditer(class_pattern, text, re.IGNORECASE)
        
        for match in matches:
            class_name = match.group(1).upper()
            start_pos = match.start()
            
            # Find the end of this class section (next class or end of text)
            next_class_match = re.search(class_pattern, text[start_pos + 1:], re.IGNORECASE)
            if next_class_match:
                end_pos = start_pos + 1 + next_class_match.start()
            else:
                end_pos = len(text)
            
            class_text = text[start_pos:end_pos]
            
            # Extract class information
            class_info = self.parse_class_section(class_text, class_name)
            if class_info:
                classes[class_name] = class_info
        
        return classes
    
    def extract_dark_fantasy_classes(self, text: str) -> Dict[str, Any]:
        """Extract dark fantasy classes"""
        classes = {}
        
        # Dark fantasy classes have different patterns
        class_pattern = r'(HEXER|SLAYER|TAMER)(?:\s+FREE\s+BENEFITS|\s+SKILLS|\s*\n)'
        
        matches = re.finditer(class_pattern, text, re.IGNORECASE)
        
        for match in matches:
            class_name = match.group(1).upper()
            start_pos = match.start()
            
            # Find the end of this class section
            next_class_match = re.search(class_pattern, text[start_pos + 1:], re.IGNORECASE)
            if next_class_match:
                end_pos = start_pos + 1 + next_class_match.start()
            else:
                end_pos = len(text)
            
            class_text = text[start_pos:end_pos]
            
            # Extract class information
            class_info = self.parse_class_section(class_text, class_name)
            if class_info:
                classes[class_name] = class_info
        
        return classes
    
    def parse_class_section(self, class_text: str, class_name: str) -> Dict[str, Any]:
        """Parse a class section to extract skills and benefits"""
        class_info = {
            'name': class_name,
            'source': self.current_source,
            'free_benefits': [],
            'skills': {},
            'spells': {},
            'description': '',
            'flavor_questions': []
        }
        
        # Extract free benefits
        free_benefits_pattern = r'FREE\s+BENEFITS\s*\n(.*?)(?=\n[A-Z][A-Z\s]*SKILLS|$)'
        free_benefits_match = re.search(free_benefits_pattern, class_text, re.DOTALL | re.IGNORECASE)
        if free_benefits_match:
            benefits_text = free_benefits_match.group(1)
            # Split by bullet points or line breaks
            benefits = re.split(r'[•▪▫]|\n\s*[►▻]', benefits_text)
            class_info['free_benefits'] = [b.strip() for b in benefits if b.strip()]
        
        # Extract skills
        skills_section = re.search(r'SKILLS\s*\n(.*?)(?=\n[A-Z][A-Z\s]*SPELLS|$)', class_text, re.DOTALL | re.IGNORECASE)
        if skills_section:
            skills_text = skills_section.group(1)
            class_info['skills'] = self.parse_skills(skills_text)
        
        # Extract spells if present
        spells_section = re.search(r'SPELLS\s*\n(.*?)(?=\n[A-Z][A-Z\s]*[A-Z]|$)', class_text, re.DOTALL | re.IGNORECASE)
        if spells_section:
            spells_text = spells_section.group(1)
            class_info['spells'] = self.parse_spells(spells_text)
        
        # Extract flavor questions (lines starting with bullet points and question marks)
        flavor_pattern = r'[•▪▫►▻]\s*(.+\?)'
        flavor_matches = re.findall(flavor_pattern, class_text)
        class_info['flavor_questions'] = flavor_matches
        
        # Extract ALSO: line for alternate names
        also_pattern = r'ALSO:\s*([^\n]+)'
        also_match = re.search(also_pattern, class_text)
        if also_match:
            class_info['alternate_names'] = [name.strip() for name in also_match.group(1).split(',')]
        
        return class_info
    
    def parse_skills(self, skills_text: str) -> Dict[str, Any]:
        """Parse skills section"""
        skills = {}
        
        # Look for skill patterns - typically CAPS followed by (level requirement)
        skill_pattern = r'([A-Z][A-Z\s&]+?)(?:\s*\(([^)]+)\))?\s*\n(.*?)(?=\n[A-Z][A-Z\s&]+?\s*\(|$)'
        
        matches = re.finditer(skill_pattern, skills_text, re.DOTALL)
        
        for match in matches:
            skill_name = match.group(1).strip()
            level_req = match.group(2) or "No level requirement"
            description = match.group(3).strip()
            
            skills[skill_name] = {
                'level_requirement': level_req,
                'description': description
            }
        
        return skills
    
    def parse_spells(self, spells_text: str) -> Dict[str, Any]:
        """Parse spells section"""
        spells = {}
        
        # Look for spell patterns - typically Spell Name MP Target Duration
        spell_pattern = r'([A-Z][A-Za-z\s]+?)\s+(\d+(?:\s*×\s*T)?)\s+(.*?)\s+(.*?)\n(.*?)(?=\n[A-Z][A-Za-z\s]+?\s+\d+|$)'
        
        matches = re.finditer(spell_pattern, spells_text, re.DOTALL)
        
        for match in matches:
            spell_name = match.group(1).strip()
            mp_cost = match.group(2).strip()
            target = match.group(3).strip()
            duration = match.group(4).strip()
            description = match.group(5).strip()
            
            spells[spell_name] = {
                'mp_cost': mp_cost,
                'target': target,
                'duration': duration,
                'description': description
            }
        
        return spells
    
    def extract_from_all_pdfs(self):
        """Extract classes from all PDFs"""
        self.find_pdfs()
        
        for pdf_path in self.pdf_files:
            print(f"\nProcessing {pdf_path.name}...")
            self.current_source = pdf_path.name
            
            text = self.extract_text_from_pdf(pdf_path)
            if not text:
                continue
            
            # Determine extraction method based on filename
            if "Dark_Fantasy" in pdf_path.name:
                extracted_classes = self.extract_dark_fantasy_classes(text)
            elif "Fabula Ultima.pdf" in pdf_path.name:
                extracted_classes = self.extract_core_classes(text)
            else:
                # Try both methods for other PDFs
                extracted_classes = self.extract_core_classes(text)
                extracted_classes.update(self.extract_dark_fantasy_classes(text))
            
            # Merge with existing classes
            for class_name, class_info in extracted_classes.items():
                if class_name in self.classes:
                    # Merge information if class exists in multiple sources
                    existing = self.classes[class_name]
                    existing['sources'] = existing.get('sources', [existing.get('source', '')])
                    existing['sources'].append(class_info['source'])
                else:
                    self.classes[class_name] = class_info
            
            print(f"  Found {len(extracted_classes)} classes")
    
    def save_results(self, output_file: str):
        """Save extracted classes to JSON file"""
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.classes, f, indent=2, ensure_ascii=False)
        print(f"\nResults saved to {output_file}")
    
    def print_summary(self):
        """Print a summary of extracted classes"""
        print(f"\n{'='*60}")
        print(f"COMPLETE CLASS EXTRACTION SUMMARY")
        print(f"{'='*60}")
        print(f"Total classes found: {len(self.classes)}")
        print()
        
        # Group by source
        by_source = {}
        for class_name, class_info in self.classes.items():
            sources = class_info.get('sources', [class_info.get('source', 'Unknown')])
            for source in sources:
                if source not in by_source:
                    by_source[source] = []
                by_source[source].append(class_name)
        
        for source, class_names in by_source.items():
            print(f"{source}:")
            for class_name in sorted(class_names):
                class_info = self.classes[class_name]
                skill_count = len(class_info.get('skills', {}))
                spell_count = len(class_info.get('spells', {}))
                print(f"  - {class_name}: {skill_count} skills, {spell_count} spells")
            print()

def main():
    """Main function"""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    extractor = FabulaUltimaClassExtractor(current_dir)
    extractor.extract_from_all_pdfs()
    extractor.print_summary()
    extractor.save_results('complete_classes_extracted.json')
    
    # Also create a detailed text report
    with open('complete_classes_report.txt', 'w', encoding='utf-8') as f:
        f.write("FABULA ULTIMA - COMPLETE CHARACTER CLASSES REPORT\n")
        f.write("=" * 60 + "\n\n")
        
        for class_name, class_info in sorted(extractor.classes.items()):
            f.write(f"CLASS: {class_name}\n")
            f.write(f"Source: {class_info.get('source', 'Unknown')}\n")
            
            if class_info.get('alternate_names'):
                f.write(f"Also known as: {', '.join(class_info['alternate_names'])}\n")
            
            f.write(f"\nFree Benefits:\n")
            for benefit in class_info.get('free_benefits', []):
                f.write(f"  • {benefit}\n")
            
            f.write(f"\nSkills:\n")
            for skill_name, skill_info in class_info.get('skills', {}).items():
                f.write(f"  • {skill_name} ({skill_info.get('level_requirement', 'No requirement')})\n")
                f.write(f"    {skill_info.get('description', 'No description')[:100]}...\n")
            
            if class_info.get('spells'):
                f.write(f"\nSpells:\n")
                for spell_name, spell_info in class_info.get('spells', {}).items():
                    f.write(f"  • {spell_name} - MP: {spell_info.get('mp_cost', 'Unknown')}, Target: {spell_info.get('target', 'Unknown')}\n")
            
            f.write(f"\n{'-' * 40}\n\n")
    
    print("\nDetailed report saved to complete_classes_report.txt")

if __name__ == "__main__":
    main()