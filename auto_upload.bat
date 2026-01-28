@echo off
title New Valley Hub - Auto Git Upload
color 0A

echo ========================================================
echo       New Valley Hub - Auto GitHub Uploader 🚀
echo ========================================================
echo.

echo [1/7] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo Error initializing git. Make sure Git is installed!
    pause
    exit /b
)
echo.

echo [2/7] Adding all files to staging...
git add .
echo.

echo [3/7] Preparing to commit...
set /p commit_msg="Enter commit message (Press Enter for 'Initial Commit'): "
if "%commit_msg%"=="" set commit_msg=Initial Commit
echo.

echo [4/7] Committing changes...
git commit -m "%commit_msg%"
echo.

echo [5/7] Linking to GitHub...
set /p repo_url="🔴 PASTE YOUR GITHUB REPOSITORY URL HERE: "
echo.

echo [6/7] Adding remote origin...
git remote add origin %repo_url%
git branch -M main
echo.

echo [7/7] Pushing to GitHub...
echo (This might ask for your credentials if not already cached)
git push -u origin main
echo.

echo ========================================================
echo                  🎉 UPLOAD COMPLETE!
echo ========================================================
pause
