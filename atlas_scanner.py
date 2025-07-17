#!/usr/bin/env python3
"""
Simple Atlas PDF scanner to look for additional classes
"""
import subprocess
import sys
import os
import re

def extract_text_with_pdftotext(pdf_path):
    """Extract text using pdftotext command"""
    try:
        result = subprocess.run(['pdftotext', '-layout', pdf_path, '-'], 
                              capture_output=True, text=True, encoding='utf-8')
        if result.returncode == 0:
            return result.stdout
        else:
            print(f"Error extracting {pdf_path}: {result.stderr}")
            return ""
    except FileNotFoundError:
        print("pdftotext not found. Trying alternative method...")
        return extract_text_with_strings(pdf_path)

def extract_text_with_strings(pdf_path):
    """Extract text using strings command as fallback"""
    try:
        result = subprocess.run(['strings', pdf_path], 
                              capture_output=True, text=True, encoding='utf-8')
        if result.returncode == 0:
            return result.stdout
        else:
            print(f"Error extracting {pdf_path}: {result.stderr}")
            return ""
    except FileNotFoundError:
        print("strings command not found.")
        return ""

def scan_for_classes(text, source_name):
    """Scan text for class-like patterns"""
    print(f"\n=== Scanning {source_name} ===")
    
    # Look for class-like patterns
    class_patterns = [
        r'([A-Z][A-Z\s]+)\s+(FREE\s+BENEFITS|SKILLS)',
        r'ALSO:\s*([A-Z][A-Za-z\s,]+)',
        r'NEW\s+CLASS[ES]*:\s*([A-Z][A-Za-z\s,]+)',
        r'HEROIC\s+SKILLS?\s*:?\s*([A-Z][A-Za-z\s,]+)',
        r'([A-Z][A-Z\s]+)\s*\(.*?\)\s*\n.*?(You|Your|When|During|As|At|After|Before|Once|If)'
    ]
    
    found_classes = set()
    
    for pattern in class_patterns:
        matches = re.finditer(pattern, text, re.IGNORECASE | re.MULTILINE)
        for match in matches:
            class_name = match.group(1).strip()
            # Filter out common false positives
            if (len(class_name) > 3 and 
                class_name not in ['FREE BENEFITS', 'SKILLS', 'ALSO', 'NEW', 'HEROIC'] and
                not class_name.startswith('THE ') and
                not class_name.startswith('A ') and
                not class_name.startswith('AN ') and
                'PAGE' not in class_name and
                'CHAPTER' not in class_name):
                found_classes.add(class_name)
    
    # Look for specific Atlas class indicators
    atlas_patterns = [
        r'DANCER',
        r'MUTANT',
        r'CHANTER',
        r'MAGICHANT',
        r'ESPER',
        r'PSYCHIC',
        r'NOBLE',
        r'COMMANDER',
        r'INVENTOR',
        r'CYBORG'
    ]
    
    for pattern in atlas_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            found_classes.add(pattern)
    
    print(f"Potential classes found: {len(found_classes)}")
    for class_name in sorted(found_classes):
        print(f"  - {class_name}")
    
    return found_classes

def main():
    """Main function"""
    atlas_pdfs = [
        'Fabula Ultima-Natural Fantasy Atlas v1.0.pdf',
        'Fabula_Ultima_Atlas_Techno_Fantasy.pdf',
        'The Low Fantasy Atlas.pdf'
    ]
    
    all_classes = set()
    
    for pdf in atlas_pdfs:
        if os.path.exists(pdf):
            print(f"Processing {pdf}...")
            text = extract_text_with_pdftotext(pdf)
            if text:
                classes = scan_for_classes(text, pdf)
                all_classes.update(classes)
                
                # Save extracted text for manual review
                output_file = f"{pdf.replace('.pdf', '')}_extracted.txt"
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(text)
                print(f"Full text saved to {output_file}")
        else:
            print(f"File not found: {pdf}")
    
    print(f"\n=== SUMMARY ===")
    print(f"Total unique classes found across all Atlas PDFs: {len(all_classes)}")
    for class_name in sorted(all_classes):
        print(f"  - {class_name}")

if __name__ == "__main__":
    main()