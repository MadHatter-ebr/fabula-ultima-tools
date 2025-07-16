#!/usr/bin/env python3
"""
Comprehensive Fabula Ultima PDF Content Extractor
Analyzes all 8 Fabula Ultima PDFs and extracts complete rules, classes, and skills
"""

import pdfplumber
import re
import json
import os
from typing import Dict, List, Any, Tuple

class FabulaUltimaExtractor:
    def __init__(self):
        self.all_content = {
            'character_classes': {},
            'spells': {},
            'skills': {},
            'items': {},
            'monsters': {},
            'rules': {},
            'world_content': {},
            'playtest_updates': {}
        }
    
    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from a PDF file"""
        try:
            with pdfplumber.open(pdf_path) as pdf:
                text = ""
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n\n"
                return text
        except Exception as e:
            print(f"Error reading {pdf_path}: {e}")
            return ""
    
    def extract_character_classes(self, text: str, source: str) -> Dict[str, Any]:
        """Extract character classes with skills and abilities"""
        classes = {}
        
        # Pattern for class sections
        class_pattern = r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*\n.*?(?:Level|Skills|Abilities|Features).*?(?=\n[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*\n|$)'
        
        matches = re.finditer(class_pattern, text, re.MULTILINE | re.DOTALL)
        
        for match in matches:
            class_name = match.group(1).strip()
            class_content = match.group(0)
            
            # Skip if it's not really a class
            if not any(keyword in class_content.lower() for keyword in ['skill', 'ability', 'level', 'hp', 'mp']):
                continue
                
            # Extract skills
            skills = self.extract_skills_from_class(class_content)
            
            # Extract attributes
            attributes = self.extract_class_attributes(class_content)
            
            # Extract description
            description = self.extract_class_description(class_content)
            
            classes[class_name.upper()] = {
                'name': class_name,
                'description': description,
                'skills': skills,
                'attributes': attributes,
                'source': source
            }
        
        return classes
    
    def extract_skills_from_class(self, class_content: str) -> List[Dict[str, Any]]:
        """Extract skills from class content"""
        skills = []
        
        # Look for skill patterns - fixed regex patterns
        skill_patterns = [
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*\[\s*([^\]]+)\]\s*([^\n]*?)(?=\n[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*\[|\n\n|\Z)',
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*:\s*([^\n]*?)(?=\n[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*:|\n\n|\Z)'
        ]
        
        for pattern in skill_patterns:
            try:
                matches = re.finditer(pattern, class_content, re.MULTILINE | re.DOTALL)
                
                for match in matches:
                    skill_name = match.group(1).strip()
                    skill_cost = match.group(2).strip() if len(match.groups()) > 2 else ""
                    skill_description = match.group(3).strip() if len(match.groups()) > 2 else match.group(2).strip()
                    
                    # Clean up description
                    skill_description = skill_description[:500]  # Limit length
                    
                    if len(skill_description) > 20:  # Filter out very short descriptions
                        skills.append({
                            'name': skill_name,
                            'cost': skill_cost,
                            'description': skill_description
                        })
            except re.error as e:
                print(f"   Warning: Regex error in skill pattern {pattern}: {e}")
                continue
        
        return skills
    
    def extract_class_attributes(self, class_content: str) -> Dict[str, Any]:
        """Extract class attributes and dice progression"""
        attributes = {}
        
        # Look for attribute patterns - fixed regex patterns
        attr_patterns = [
            r'Primary\s*(?:Attributes?)?\s*:\s*([^\n]*?)(?=\n|Secondary|$)',
            r'Secondary\s*(?:Attributes?)?\s*:\s*([^\n]*?)(?=\n|Primary|$)',
            r'(?:Might|Dexterity|Intellect|Willpower)\s*:\s*([d\d]+)',
            r'HP\s*:\s*(\d+)',
            r'MP\s*:\s*(\d+)'
        ]
        
        for pattern in attr_patterns:
            try:
                matches = re.finditer(pattern, class_content, re.IGNORECASE)
                for match in matches:
                    key = match.group(0).split(':')[0].strip().lower()
                    value = match.group(1).strip()
                    attributes[key] = value
            except re.error as e:
                print(f"   Warning: Regex error in pattern {pattern}: {e}")
                continue
        
        return attributes
    
    def extract_class_description(self, class_content: str) -> str:
        """Extract class description"""
        lines = class_content.split('\n')
        description_lines = []
        
        for line in lines[1:6]:  # Take first few lines after class name
            line = line.strip()
            if line and not any(keyword in line.lower() for keyword in ['skill', 'level', 'hp', 'mp', 'primary', 'secondary']):
                description_lines.append(line)
        
        return ' '.join(description_lines)[:200]  # Limit length
    
    def extract_spells(self, text: str, source: str) -> Dict[str, Any]:
        """Extract spells and magical abilities"""
        spells = {}
        
        # Look for spell patterns
        spell_pattern = r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*\[\s*([^]]+)\]\s*([^]*?)(?=\n[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*\[|\n\n\n|\Z)'
        
        matches = re.finditer(spell_pattern, text, re.MULTILINE | re.DOTALL)
        
        for match in matches:
            spell_name = match.group(1).strip()
            spell_cost = match.group(2).strip()
            spell_description = match.group(3).strip()[:400]
            
            # Filter for actual spells
            if any(keyword in spell_description.lower() for keyword in ['spell', 'magic', 'mp', 'target', 'damage', 'effect']):
                spells[spell_name] = {
                    'name': spell_name,
                    'cost': spell_cost,
                    'description': spell_description,
                    'source': source
                }
        
        return spells
    
    def extract_items(self, text: str, source: str) -> Dict[str, Any]:
        """Extract items and equipment"""
        items = {}
        
        # Look for item patterns with costs
        item_pattern = r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*.*?(\d+)\s*zenit.*?([^]*?)(?=\n[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*.*?\d+\s*zenit|\n\n|\Z)'
        
        matches = re.finditer(item_pattern, text, re.MULTILINE | re.DOTALL)
        
        for match in matches:
            item_name = match.group(1).strip()
            item_cost = match.group(2).strip()
            item_description = match.group(3).strip()[:300]
            
            # Categorize items
            category = self.categorize_item(item_description)
            
            items[item_name] = {
                'name': item_name,
                'cost': int(item_cost),
                'category': category,
                'description': item_description,
                'source': source
            }
        
        return items
    
    def categorize_item(self, description: str) -> str:
        """Categorize an item based on its description"""
        desc_lower = description.lower()
        
        if any(keyword in desc_lower for keyword in ['sword', 'blade', 'bow', 'staff', 'weapon', 'dagger', 'axe']):
            return 'weapons'
        elif any(keyword in desc_lower for keyword in ['armor', 'shield', 'helmet', 'protection', 'defense']):
            return 'armor'
        elif any(keyword in desc_lower for keyword in ['potion', 'elixir', 'consumable', 'drink', 'eat']):
            return 'consumables'
        elif any(keyword in desc_lower for keyword in ['ring', 'amulet', 'accessory', 'pendant', 'jewel']):
            return 'accessories'
        else:
            return 'miscellaneous'
    
    def extract_rules(self, text: str, source: str) -> Dict[str, Any]:
        """Extract game rules and mechanics"""
        rules = {}
        
        # Look for rule sections
        rule_patterns = [
            r'((?:Clock|Bond|Crisis|Ritual|Weather|Travel|Initiative|Combat|Magic|Spell)\s*Rules?)\s*([^]*?)(?=\n[A-Z][A-Z\s]+\n|\n\n\n|\Z)',
            r'(How to [^]*?)\s*([^]*?)(?=\nHow to|\n[A-Z][A-Z\s]+\n|\n\n\n|\Z)',
            r'(Dice\s*(?:Rolling|System|Mechanics)?)\s*([^]*?)(?=\n[A-Z][A-Z\s]+\n|\n\n\n|\Z)'
        ]
        
        for pattern in rule_patterns:
            matches = re.finditer(pattern, text, re.MULTILINE | re.DOTALL | re.IGNORECASE)
            
            for match in matches:
                rule_name = match.group(1).strip()
                rule_content = match.group(2).strip()[:800]
                
                if len(rule_content) > 50:  # Filter out very short rules
                    rules[rule_name.lower()] = {
                        'name': rule_name,
                        'content': rule_content,
                        'source': source
                    }
        
        return rules
    
    def analyze_dice_system(self, text: str) -> Dict[str, Any]:
        """Analyze dice system and attribute progression"""
        dice_info = {}
        
        # Look for dice progression patterns
        dice_patterns = [
            r'(d\d+)\s*.*?(\d+)\s*[-–]?\s*(\d+)',
            r'(\d+)\s*[-–]\s*(\d+)\s*:\s*(d\d+)',
            r'Attribute\s*(\d+)\s*.*?(d\d+)'
        ]
        
        progression = {}
        for pattern in dice_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                # Extract dice progression information
                groups = match.groups()
                if len(groups) >= 2:
                    if groups[0].startswith('d'):
                        dice_info[groups[0]] = f"{groups[1]}-{groups[2]}" if len(groups) > 2 else groups[1]
                    else:
                        range_start = groups[0]
                        range_end = groups[1] if len(groups) > 1 else groups[0]
                        dice_type = groups[2] if len(groups) > 2 else groups[1]
                        progression[f"{range_start}-{range_end}"] = dice_type
        
        return {
            'dice_info': dice_info,
            'progression': progression
        }
    
    def process_all_pdfs(self):
        """Process all Fabula Ultima PDFs"""
        pdf_files = [
            ('Fabula Ultima.pdf', 'Core Rules'),
            ('Dark_Fantasy_Classes_v0.2.pdf', 'Dark Fantasy Classes'),
            ('Fabula Ultima Playtest Materials (ENG) (January 23rd, 2025) (single page).pdf', 'Playtest Materials'),
            ('Fabula Ultima-Natural Fantasy Atlas v1.0.pdf', 'Natural Fantasy Atlas'),
            ('Fabula-Bonus-Ace-of-Cards.pdf', 'Bonus - Ace of Cards'),
            ('Fabula-Ultima-Bonus-02-Edgar-eng.pdf', 'Bonus - Edgar'),
            ('Fabula_Ultima_Atlas_Techno_Fantasy.pdf', 'Techno Fantasy Atlas'),
            ('The Low Fantasy Atlas.pdf', 'Low Fantasy Atlas')
        ]
        
        for pdf_file, source in pdf_files:
            if os.path.exists(pdf_file):
                print(f"📖 Processing {pdf_file}...")
                text = self.extract_text_from_pdf(pdf_file)
                
                if text:
                    # Extract different types of content
                    classes = self.extract_character_classes(text, source)
                    spells = self.extract_spells(text, source)
                    items = self.extract_items(text, source)
                    rules = self.extract_rules(text, source)
                    
                    # Merge into main content
                    self.all_content['character_classes'].update(classes)
                    self.all_content['spells'].update(spells)
                    self.all_content['items'].update(items)
                    self.all_content['rules'].update(rules)
                    
                    # Analyze dice system from core rules
                    if 'Core Rules' in source:
                        dice_system = self.analyze_dice_system(text)
                        self.all_content['dice_system'] = dice_system
                    
                    print(f"   ✅ Extracted {len(classes)} classes, {len(spells)} spells, {len(items)} items, {len(rules)} rules")
                else:
                    print(f"   ❌ Failed to extract text from {pdf_file}")
            else:
                print(f"   ⚠️ {pdf_file} not found")
    
    def save_extracted_content(self):
        """Save all extracted content to files"""
        # Save individual files
        individual_files = {
            'fabula_ultima_complete_classes.json': self.all_content['character_classes'],
            'fabula_ultima_complete_spells.json': self.all_content['spells'],
            'fabula_ultima_complete_items.json': self.all_content['items'],
            'fabula_ultima_complete_rules.json': self.all_content['rules'],
            'fabula_ultima_dice_system.json': self.all_content.get('dice_system', {})
        }
        
        for filename, content in individual_files.items():
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(content, f, indent=2, ensure_ascii=False)
            print(f"💾 Saved {filename}")
        
        # Save complete content
        with open('fabula_ultima_complete_extracted_content.json', 'w', encoding='utf-8') as f:
            json.dump(self.all_content, f, indent=2, ensure_ascii=False)
        
        print("🎉 Complete extraction saved!")
    
    def generate_summary(self):
        """Generate a summary of extracted content"""
        print("\n📊 EXTRACTION SUMMARY:")
        print("=" * 50)
        print(f"Character Classes: {len(self.all_content['character_classes'])}")
        print(f"Spells: {len(self.all_content['spells'])}")
        print(f"Items: {len(self.all_content['items'])}")
        print(f"Rules: {len(self.all_content['rules'])}")
        
        print("\n🎭 CLASSES FOUND:")
        for class_name, class_data in self.all_content['character_classes'].items():
            skills_count = len(class_data.get('skills', []))
            source = class_data.get('source', 'Unknown')
            print(f"   {class_name}: {skills_count} skills ({source})")
        
        print("\n🎲 DICE SYSTEM:")
        dice_system = self.all_content.get('dice_system', {})
        if dice_system:
            print(f"   Progression rules: {len(dice_system.get('progression', {}))}")
            print(f"   Dice information: {len(dice_system.get('dice_info', {}))}")

def main():
    print("🎮 Fabula Ultima Comprehensive Content Extractor")
    print("=" * 60)
    
    extractor = FabulaUltimaExtractor()
    extractor.process_all_pdfs()
    extractor.save_extracted_content()
    extractor.generate_summary()

if __name__ == "__main__":
    main()