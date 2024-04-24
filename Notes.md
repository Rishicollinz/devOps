### Curl ###

###### Date : 24/4/24

**General Commands:**

1. `curl <url>`
    - Returns data but doesn't follow the forwarding.
    - It will show that the file is permentately moved.
2. `curl -L <url>`
    - Will follow the forwarding and return data.

**Saving the output**
1. `curl -L <url> > filename`
2. `curl -o filename <url>`
3. `curl -X <http_methods>`
4. `curl -H 'headername:value' <url>`
5. `curl -d 'username=admin&password=1234' <url>`
6. ```curl -d <url>```

```
sudo apt update
```