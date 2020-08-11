#!/usr/bin/env bash

export FLASK_APP=app.py
export FLAST_ENV=development

flask run --host=0.0.0.0
