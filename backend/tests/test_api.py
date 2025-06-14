#!/usr/bin/env python3
"""
API Testing Script for Employee Dashboard
Run this to test all major API endpoints
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

class APITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token = None
        self.headers = {"Content-Type": "application/json"}
    
    def test_health_check(self):
        """Test health endpoint"""
        print("🔍 Testing Health Check...")
        try:
            response = requests.get(f"{self.base_url}/health")
            if response.status_code == 200:
                print("✅ Health check passed")
                return True
            else:
                print(f"❌ Health check failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Health check error: {e}")
            return False
    
    def test_login(self, employee_id="ADMIN001", password="admin123"):
        """Test login endpoint"""
        print(f"🔐 Testing Login with {employee_id}...")
        try:
            login_data = {
                "employee_id": employee_id,
                "password": password
            }
            
            response = requests.post(
                f"{self.base_url}/api/auth/login",
                headers=self.headers,
                data=json.dumps(login_data)
            )
            
            if response.status_code == 200:
                data = response.json()
                self.token = data.get("access_token")
                self.headers["Authorization"] = f"Bearer {self.token}"
                print("✅ Login successful")
                print(f"   Employee: {data.get('employee', {}).get('full_name')}")
                print(f"   Role: {data.get('employee', {}).get('role')}")
                return True
            else:
                print(f"❌ Login failed: {response.status_code}")
                print(f"   Response: {response.text}")
                return False
                
        except Exception as e:
             print(f"An error occurred: {e}")
             return False

if __name__ == "__main__":
    tester = APITester()
    if tester.test_health_check():
        tester.test_login()

 