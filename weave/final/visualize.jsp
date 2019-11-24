<%--
    Document   : visualize
    Created on : Nov 20, 2019, 5:48:59 PM
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

    <title>Apotheosis | VISUALIZE</title>
    <link rel="shortcut icon" type="image/png" href="media/favicon.ico"/>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    <!-- Our own CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- include Charts.js in our page -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

    <!-- For the onload function -->
    <script src="Visualize.js"></script>
    <style>
      .chart {
          outline-style: solid;
      }
    </style>
  </head>

  <body onload='callFunctions()'>
    <!-- JavaScript Links need to be in the body (requires Jquery) -->
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
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
            <li id="active">
              <a href="visualize.html"><span class="glyphicon glyphicon-stats"></span>VISUALIZE</a>
            </li>
            <li>
              <a href="playlists.html"><span class="glyphicon glyphicon-play-circle"></span>PLAYLISTS</a>
            </li>
            <li>
              <a href="settings.html"><span class="glyphicon glyphicon-cog"></span>SETTINGS</a>
            </li>
          </ul>
        </div>
      </div>
    </div>


          <div class="container overflow-auto" style="margin-bottom: 70px;">
              <div class="row" style="margin-top: 40px;">

                <div class="page-header">
                    <h1>visualize <small>Your music and stats.</small></h1>
                </div>

                <div class="col-lg-6 col-md-3">
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <h2>Listening Habbits:</h2>
                  <canvas class="chart" id="LastListened"></canvas>
                </div>


                <div class="col-lg-6 col-md-3">
                  <h2>Music Genres:</h2>
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <canvas class="chart" id="genres"></canvas>

                </div>

                <div class="col-lg-6 col-md-3">
                  <h2>Location of Music:</h2>
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <canvas class="chart" id="location"></canvas>

                </div>

                <div class="col-lg-6 col-md-3">
                  <h2>Style and Beat</h2>
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <canvas class="chart" id="beat"></canvas>

                </div>

                <div class="col-lg-12">
                  <h2>Frequency of listening:</h2>
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <canvas class="chart" id="frequency"></canvas>

                </div>


              </div>

          <script src="VisualizeCharts.js"></script>

  </body>
</html>
