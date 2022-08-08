# auto-gift-scelgozero

## What's the purpose?
This is a bot used to auto redeem gifts of the scelgozero platform

## How does it work?
This is an unofficial app, the bot automatically login using credentials, get an authToken and simulate the browser requests used to unlock, open gifts.
It also schedule a new gift handling task when the gift will be avaiable again.

## Getting started
Just create a file named "accounts.json" and put it in the ./src folder. 
here's a template you can use to create the file:
```
[
  {
    "username": "your_username",
    "password": "your_password"
  },
  {
    "username": "your_username2",
    "password": "your_password2"
  }
]
```

It supports multiple accounts.
