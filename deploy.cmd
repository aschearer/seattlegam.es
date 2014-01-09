:Deployment
echo Disabling strict ssl for npm
call npm config set strict-ssl false

echo Installing dependencies
call npm install

echo Building app
call .\node_modules\.bin\grunt.cmd

echo Installing kudusync
call npm install kudusync -g

echo Syncing artifacts
call node "%appdata%\npm\node_modules\kuduSync\bin\kuduSync" -v 50 -f out -t ..\wwwroot -n ..\manifest -p ..\manifest
