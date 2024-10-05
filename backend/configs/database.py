from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import sys

load_dotenv()  # This loads environment variables from a .env file

# Use SQLite database
DATABASE_URL = "sqlite:///./test.db"  # This will create a file named test.db in your current directory

# Configure the engine with pre-ping to check connection health
# Note: check_same_thread=False is needed for SQLite when used with Flask
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create a session maker for handling database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for model classes to inherit from
Base = declarative_base()

# Dependency to get the database session in other parts of the app
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)