

RESTFUL ROUTES

name    url                 verb    Description
==================================================================
INDEX   /campgrounds        GET     Displays all camp grounds
NEW     /campgrounds/new    GET     Display a form to make a new campground
CREATE  /campgrounds        POST    Add new campground to DB
SHOW    /campgrounds/:id    POST    Show info of one post

Comments:
NEW     /campgrounds/:id/comments/new   GET
CREATE  /campgrounds/:id/comments       POST

