<%-- 
    Document   : playlists
    Created on : Nov 20, 2019, 5:51:47 PM
    Author     : damon
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <title>Apotheosis | PLAYLISTS</title>
    <link rel="shortcut icon" type="image/png" href="media/favicon.ico"/>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    <!-- Our own CSS -->
    <link rel="stylesheet" href="style.css">

    <style>
        .page-header {
            padding-left: 20px;
        }
    </style>

</head>

<body>
<!-- JavaScript Links need to be in the body (requires Jquery) -->
<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
<script src="script.js"></script>
<script src="menu.js"></script>

<div class="site-nav">
    <!-- Blue navigation bar fixed to top when scrolling -->
    <nav class="navbar navbar-static-top" id="topbar">

        <a class="navbar-brand" href="home.html">
            <img id="spin" style="max-height: 20px" alt="Apotheosis" src="media/logo_short_white.png" class="spin">
        </a>

        <a onclick="menuSlideOut()" class="navbar-brand">
            <span class="glyphicon glyphicon-align-left"></span>
        </a>

        <a class="navbar-brand" data-toggle="collapse" data-target="#userbar">
            <span class="glyphicon glyphicon-user"></span>
        </a>

    </nav>

    <!-- user bar with user info, login/logout, etc -->
    <div class="collapse nav navbar-nav" id="userbar">
        <nav class="nav">

            <a class="navbar-brand">
                <span class="glyphicon glyphicon-headphones" ></span>
            </a>

            <a class="navbar-brand">
                <span class="glyphicon glyphicon-random" ></span>
            </a>


            <a class="navbar-brand navbar-right">logout &nbsp
                <span class="glyphicon glyphicon-off" ></span>
            </a>

        </nav>
    </div>

    <!-- Collapsable side menu bar -->
    <!-- TODO: figure out how to get the menu to open from the side -->
    <div class="nav navbar-nav navbar-left sidebar" id="sidebar">

        <!-- Needs subclass otherwise there are javascript issues -->
        <div class="menu">
            <ul class="list-unstyled">
                <li>
                    <a href="home.html"><span class="glyphicon glyphicon-home"></span>HOME</a>
                </li>
                <li>
                    <a href="visualize.html"><span class="glyphicon glyphicon-stats"></span>VISUALIZE</a>
                </li>
                <li id="active">
                    <a href="playlists.html"><span class="glyphicon glyphicon-play-circle"></span>PLAYLISTS</a>
                </li>
                <li>
                    <a href="settings.html"><span class="glyphicon glyphicon-cog"></span>SETTINGS</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="container overflow-auto">
    <div class="row" style="margin-top: 40px;">
      <div class="page-header">
          <h1>Playlists <small>The music you enjoy and more.</small></h1>
      </div>

        <div class="col-lg-12" style="background-color: #c7c7c7;">
            <h1>Your Playlists</h1>
            <a href="#"><img class="playlist"></a>
            <a href="#"><img class="playlist"></a>
            <a href="#"><img class="playlist"></a>
        </div>


        <div class="col-lg-12" style="background-color: #c7c7c7;">
            <h1>Suggested Playlists by Spotify&copy;</h1>

            <div class="pre-scrollable">


                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>
            </div>
        </div>

        <div class="col-lg-12" style="background-color: #c7c7c7;">
            <h1>Suggested Playlists by Apotheosis</h1>
            <div class="pre-scrollable">


                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>
            </div>
        </div>

        <div class="col-lg-12" style="background-color: #c7c7c7;">
            <h1>Artist you may like:</h1>
            <div class="pre-scrollable">


                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>
            </div>
        </div>

        <div class="col-lg-12" style="background-color: #c7c7c7;">
            <h1>Explore Popular Music in your Region</h1>
            <div class="pre-scrollable">


                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>

                <div class="col-xs-3 col-md-2">
                    <a href="#" class="thumbnail">
                        <img src="media/apotheosis_coverart.png" alt="...">
                    </a>
                </div>
            </div>
        </div>

        <div class="col-lg-12" id="footer" style="background-color: #F5F5F5; height: 70px;">
            <p></p>
        </div>

    </div>
</div>

</body>
</html>
