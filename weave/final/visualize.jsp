<%--
    Document   : visualize
    Created on : Nov 20, 2019, 5:48:59 PM
    Author     : el_damon
--%>

<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>

    <!-- For the onload function -->
    <script src="Visualize.js"></script>
    <style>
      .chart {
          outline-style: solid;
      }
    </style>
  </head>

  <body onload='callFunctions(); hideSettings();'>
    <!-- JavaScript Links need to be in the body (requires Jquery) -->
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
    <script src="menu.js"></script>

    <div class="site-nav">
      <!-- Blue navigation bar fixed to top when scrolling -->
      <nav class="navbar navbar-static-top" id="topbar">

        <a class="navbar-brand" href="home.jsp">
          <img id="spin" style="max-height: 20px" alt="Apotheosis" src="media/logo_short_white.png" class="spin">
        </a>

        <a onclick="menuSlideOut()" class="navbar-brand">
          <span class="glyphicon glyphicon-align-left"></span>
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
              <form id="option" action="settingsServlet" method="post">
                  <input type="hidden" name="action" value="home" />
                  <span id="menu-icon" class="glyphicon glyphicon-home"></span>
                  <input id="submit" type="submit" value="HOME"/>
              </form>
            </li>
            <li>
              <form class="active" id="option" action="settingsServlet" method="post">
                  <input type="hidden" name="action" value="visualize" />
                  <span id="menu-icon" class="glyphicon glyphicon-stats"></span>
                  <input id="submit" type="submit" value="VISUALIZE"/>
              </form>
            </li>
            <li>
              <form id="option" action="settingsServlet" method="post">
                  <input type="hidden" name="action" value="playlists" />
                  <span id="menu-icon" class="glyphicon glyphicon-play-circle"></span>
                  <input id="submit" type="submit" value="PLAYLISTS"/>
              </form>
            </li>
            <li>
            <div id="settingsLinkMenu">
              <form id="option" action="settingsServlet" method="post">
                  <input type="hidden" name="action" value="settings" />
                  <span id="menu-icon" class="glyphicon glyphicon-cog"></span>
                  <input id="submit" type="submit" value="SETTINGS"/>
              </form>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

          <div class="container overflow-auto" style="margin-bottom: 70px;">
              <div class="row" style="margin-top: 40px;">

                <div class="page-header">
                    <h1>Visualize <small>Your music and stats.</small></h1>
                </div>

                <div class="col-lg-6 col-md-3">
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <h2>Your Favorite Track of All Time</h2>
                  <canvas class="chart" id="LastListened"></canvas>
                </div>


                <div class="col-lg-6 col-md-3">
                  <h2>Your Favorite Genres of All Time</h2>
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <canvas class="chart" id="genres"></canvas>

                </div>

                <div class="col-lg-6 col-md-3">
                  <h2>Your Top 50 Tracks Mood</h2>
                  <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
                  <canvas class="chart" id="moods"></canvas>

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
            </div>

          <script src="VisualizeCharts.js"></script>
          <script>
                var userID = sessionStorage.getItem("userID");
                function hideSettings () {
                    if(userID === null) {
                        document.getElementById("settingsLinkMenu").innerHTML = "";
                        document.getElementById("settingsLinkFooter").innerHTML = "";
                    }
                }
          </script>

  </body>

  <footer class="footer">
    <div class="container overflow-auto">
      <div class="row" style="margin-top: 40px;">
        <div class="col-lg-4">
          <p>Apotheosis is a music aggregation website taking your music from
            Spotify&copy; and displaying the different types of information available
            on your music playing habits.</p>

          <p>We can also make music suggestions right from out website!</p>
        </div>

          <div class="col-lg-3 footer-spacing" style="margin-left: 20px;">
            <ul id="footer-links">
                <li>
                  <form action="settingsServlet" method="post">
                      <input type="hidden" name="action" value="home" />
                      <input id="submit" type="submit" value="HOME"/>
                  </form>
                </li>
                <li>
                  <form action="settingsServlet" method="post">
                      <input type="hidden" name="action" value="visualize" />
                      <input id="submit" type="submit" value="VISUALIZE"/>
                  </form>
                </li>
                <li>
                  <form action="settingsServlet" method="post">
                      <input type="hidden" name="action" value="playlists" />
                      <input id="submit" type="submit" value="PLAYLISTS"/>
                  </form>
                </li>
                <li>
                  <div id="settingsLinkFooter">
                  <form action="settingsServlet" method="post">
                      <input type="hidden" name="action" value="settings" />
                      <input id="submit" type="submit" value="SETTINGS"/>
                  </form>
                  </div>
                </li>
            </ul>
          </div>

          <div class = "col-lg-4 footer-spacing">
                <img style="max-height: 50px" src="media/logo_short_white.png">
                <img style="max-height: 20px" src="media/word_long_white.png">
          </div>
      </div>
    </div>

      <div class="row" style="margin-top: 20px; background-color: #171e26; width:100%;">
          <h4 class="copyright">&copy; 2019 Apotheosis - NMT CSE321</h4>
      </div>

  </footer>

</html>
