
scp gpio-code.py pi@10.0.0.165:/tmp/gpio-code.py
ssh pi@10.0.0.165 python3 /tmp/gpio-code.py

scp gpio-code.py pi@10.0.0.165:/tmp/gpio-code.py
ssh pi@10.0.0.165 python3 /tmp/gpio-code.py

# kills python after ctrl c. 
# comment out if you dont want this behavior
ssh pi@10.0.0.165 killall python3 