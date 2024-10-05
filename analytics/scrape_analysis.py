from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

# Specify the path to your ChromeDriver
chrome_driver_path = 'path_to_chromedriver'  # Replace this with the actual path to your chromedriver

# Create a Service object and pass it to the WebDriver
service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=service)

# Open the website
driver.get("https://www.degives.org/search?q=a")

# Allow the page some time to load
time.sleep(5)  # Adjust this as needed

# Example: Find elements containing NGO names
# Adjust class name based on the actual HTML structure
ngos = driver.find_elements(By.CLASS_NAME, "card-title")

# Print the scraped NGO names
for ngo in ngos:
    print(ngo.text)

# Close the driver
driver.quit()
