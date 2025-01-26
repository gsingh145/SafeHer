https://docs.google.com/document/d/1_Sx6vgzywbDPfBMFoz72sWtczq9pSrTRO6DWh5XX5xI/edit?usp=sharing

# Steps to Run

# Install Go

# Install mysql

- Set up password for SQL
Should set password to "your_password" as that is what is hardcoded in the backend repo
```
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```
- Use this to login
``` mysql -u root -p ```

# Add firebase-key.json
allows for realtime updates
```
touch firebase-key.json
```
ask me for the key


# Compile exe 
``` go build main.go ```
# Run exe
```./main```


# Set up Ngrok 
- download from website
- setup an acess token
allows your localally running backend to run on public url
```
ngrok http 8080
```
- copy the forwarding IP and paste it into frontend/config.js
- everytime you rerun backend need to get a new public url with ngrok and update it in the frontend config.js
