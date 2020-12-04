# MindMovement Website
## Summary:
This is a basic website to train your brain with fun little games. It also has a few more pages like an about and contact page.

## How to run:
The website runs using the web framwork Flask in python. Make sure you have pipenv working so that you can use the configured pipenv environment.

Here is the code to setup the environment using pipenv:

```
pipenv install
```

Now you can enter the environment using the line:

```
pipenv shell
```

Then we just need to run the rundev.sh file that is provided to get it running.

Note that before running the file you may need to change the permissions on the file to run it. Here is the code you need to do that:

```
chmod +x rundev.sh
```

Finally, You can run the file with the line:

```
./rundev.sh
```

After that the website should be running. You can see the website if you type into a browser 'localhost:5000'.