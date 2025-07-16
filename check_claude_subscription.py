#!/usr/bin/env python3
"""
Claude API Subscription Checker
Displays your Claude API usage and subscription information in the console.
"""

import requests
import json
import os
import sys
import argparse
from datetime import datetime
from typing import Dict, Any

class ClaudeAPIChecker:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.anthropic.com/v1"
        self.headers = {
            "x-api-key": api_key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01"
        }
    
    def get_usage_info(self) -> Dict[str, Any]:
        """Get current usage information from the API"""
        endpoints_to_try = [
            f"{self.base_url}/usage",
            f"{self.base_url}/billing/usage",
            f"{self.base_url}/account/usage",
            f"{self.base_url}/credits"
        ]
        
        for endpoint in endpoints_to_try:
            try:
                response = requests.get(endpoint, headers=self.headers)
                
                if response.status_code == 200:
                    return {"endpoint": endpoint, "data": response.json()}
                elif response.status_code == 404:
                    continue  # Try next endpoint
                else:
                    return {"error": f"API request to {endpoint} failed with status {response.status_code}: {response.text}"}
                    
            except requests.exceptions.RequestException as e:
                return {"error": f"Network error for {endpoint}: {str(e)}"}
        
        return {"error": "No valid usage endpoint found. All endpoints returned 404 or errors."}
    
    def test_api_connection(self) -> Dict[str, Any]:
        """Test if the API key works by making a simple request"""
        try:
            # Test with a minimal message request
            test_data = {
                "model": "claude-3-haiku-20240307",
                "max_tokens": 10,
                "messages": [{"role": "user", "content": "Hi"}]
            }
            
            response = requests.post(
                f"{self.base_url}/messages",
                headers=self.headers,
                json=test_data
            )
            
            if response.status_code == 200:
                return {"status": "success", "message": "API key is valid"}
            elif response.status_code == 400:
                # Check if it's a credit issue but key is valid
                error_data = response.json()
                if "credit balance is too low" in error_data.get("error", {}).get("message", ""):
                    return {"status": "low_credits", "message": "API key is valid but credit balance is too low"}
                else:
                    return {"status": "error", "message": f"API test failed: {response.status_code} - {response.text}"}
            else:
                return {"status": "error", "message": f"API test failed: {response.status_code} - {response.text}"}
                
        except requests.exceptions.RequestException as e:
            return {"status": "error", "message": f"Connection error: {str(e)}"}

def format_usage_display(usage_data: Dict[str, Any]) -> str:
    """Format usage data for console display"""
    output = []
    output.append("=" * 50)
    output.append("CLAUDE API SUBSCRIPTION STATUS")
    output.append("=" * 50)
    output.append(f"Checked at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    output.append("")
    
    if "error" in usage_data:
        output.append(f"❌ Error: {usage_data['error']}")
    else:
        # Format the actual usage data
        # Note: Exact structure depends on API response format
        for key, value in usage_data.items():
            if key == "usage":
                output.append("📊 Usage Information:")
                for usage_key, usage_value in value.items():
                    output.append(f"  {usage_key}: {usage_value}")
            elif key == "limits":
                output.append("📋 Limits:")
                for limit_key, limit_value in value.items():
                    output.append(f"  {limit_key}: {limit_value}")
            else:
                output.append(f"{key}: {value}")
    
    output.append("=" * 50)
    return "\n".join(output)

def main():
    """Main function to run the subscription checker"""
    parser = argparse.ArgumentParser(description='Check Claude API subscription status')
    parser.add_argument('--api-key', '-k', type=str, help='Your Anthropic API key')
    parser.add_argument('--env', '-e', action='store_true', help='Use API key from environment variable')
    
    args = parser.parse_args()
    
    # Get API key from command line argument or environment variable
    if args.api_key:
        api_key = args.api_key
    else:
        api_key = os.getenv("ANTHROPIC_API_KEY")
    
    if not api_key:
        print("❌ Error: No API key provided")
        print("\nOptions:")
        print("1. Use command line: python3 check_claude_subscription.py --api-key 'your-key-here'")
        print("2. Set environment variable: export ANTHROPIC_API_KEY='your-key-here'")
        print("3. Use environment flag: python3 check_claude_subscription.py --env")
        return
    
    print("🔍 Checking Claude API subscription...")
    
    checker = ClaudeAPIChecker(api_key)
    
    # First test the API connection
    connection_test = checker.test_api_connection()
    if connection_test["status"] == "error":
        print(f"❌ API Connection Error: {connection_test['message']}")
        return
    elif connection_test["status"] == "low_credits":
        print(f"⚠️ {connection_test['message']}")
        print("📝 Trying to get usage information anyway...")
    else:
        print("✅ API connection successful")
    
    # Get usage information
    usage_info = checker.get_usage_info()
    
    # Display formatted results
    print(format_usage_display(usage_info))
    
    # Additional note about usage endpoint
    if "error" in usage_info:
        print("\n📝 Note: The usage endpoint might not be publicly available.")
        print("You can check your usage at: https://console.anthropic.com/")

if __name__ == "__main__":
    main()