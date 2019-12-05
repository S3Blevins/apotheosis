
<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <title>Apotheosis | HOME</title>
    <link rel="shortcut icon" type="image/png" href="media/favicon.ico"/>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    <!-- Our own CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- include Charts.js in our page -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.0"></script>

    <!-- For the onload function -->
    <script src="Test.js"></script>
    <style>
      .media-object {
        max-height: 50px;
      }
    </style>
  </head>

  <body onload="getAccessToken(); hideSettings();">
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
              <form class="active" id="option" action="settingsServlet" method="post">
                  <input type="hidden" name="action" value="home" />
                  <span id="menu-icon" class="glyphicon glyphicon-home"></span>
                  <input id="submit" type="submit" value="HOME"/>
              </form>
            </li>
            <li>
              <form id="option" action="settingsServlet" method="post">
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

        <div class="col-lg-12 jumbotron">
          <div class="col-lg-8">
            <h1 id="userName">Hello, </h1>
            <p>Welcome to Apotheosis, where you can visualize your music tastes and explore related content.</p>
              <form class="btn btn-primary btn-lg" action="settingsServlet" method="post">
                  <input type="hidden" name="action" value="settings" />
                  <input id="submit" type="submit" value="Settings"/>
              </form>
          </div>
          <div class="col-lg-4">
            <img id="userPicture" src="media/empty-profile.png" alt="profile picture">
          </div>
        </div>

        <div class="col-lg-6 col-md-3">
          <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
          <h2>Listening Habits:</h2>
          <canvas class="chart" id="LastListened"></canvas>
        </div>

        <div class="col-lg-3 col-md-3">
          <!-- This is where the radar chart is displayed and created (external script file: LastListened.js) -->
          <a href="#" class="thumbnail" id="LPTA" target="_blank">
            <img src="media/apotheosis_coverart.png" alt="..." id="LPT">
          </a>
        </div>
        <div class="col-lg-3">
          <h2 id="last-track-title">TITLE</h2>
          <p id="last-track-artist">Artist: </p>
          <p id="last-track-date">Released: </p>
        </div>

        <div class="col-lg-12 col-md-6">
          <!-- This is where the table is displayed -->
          <h2 id="last5listened">Last 5 Tracks Listened To:</h2>
          <div class="list-group" id="5TrackList">
            <a id="last5listened1" href="#" class="list-group-item">Song/Artist</a>
            <a id="last5listened2" href="#" class="list-group-item">Song/Artist</a>
            <a id="last5listened3" href="#" class="list-group-item">Song/Artist</a>
            <a id="last5listened4" href="#" class="list-group-item">Song/Artist</a>
            <a id="last5listened5" href="#" class="list-group-item">Song/Artist</a>
          </div>
        </div>

        <div class="col-lg-12" style="background-color: #c7c7c7; margin-top:30px; margin-bottom:30px;">
          <h1>Your Last Saved Tracks</h1>
          <div class="pre-scrollable" id="YLST">
              <!-- Track cover arts are populated here from the JS file. -->
          </div>
        </div>

        <div>
          <div class="col-lg-3">
            <img src="media/apotheosis_coverart.png" alt="music" style="max-height:250px;">
          </div>

          <div class="col-lg-9">
            <div class="media">
              <div class="media-left media-middle">
                <a href="#">
                  <img class="media-object" src="media/apotheosis_coverart.png" alt="music">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">How many tracks you have listened to today.</h4>
                  <p id="numTracksToday"># tracks listened to today!!!</p>
              </div>
            </div>

            <div class="media">
              <div class="media-left media-middle">
                <a href="#">
                  <img class="media-object" src="media/apotheosis_coverart.png" alt="music">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">Random Fact Based On Your Listening History</h4>
                <div id="numMinutesToday">
                    The longest possible eclipse of the sun is 7.31 minutes.
                    This means based off your listening history today,
                </div>
              </div>
            </div>

            <div class="media">
              <div class="media-left media-middle">
                <a href="#">
                  <img class="media-object" src="media/apotheosis_coverart.png" alt="music">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">music news topic</h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </div>
            </div>
          </div>
        </div>
      </div>
      <script></script>
  </div>

  <script src="homeAPI.js"></script>
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
              Spotify© and displaying the different types of information available
              on your music playing habits.</p>

            <p>We can also make music suggestions right from out website!</p>
          </div>

          <div class="col-lg-4" style="margin-left: 20px;">
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

          <div class="col-lg-4">
          </div>

      </div>
    </div>

      <div class="row" style="margin-top: 20px; background-color: #171e26; width:100%;">
          <h4 class="copyright">© 2019 Apotheosis - NMT CSE321</h4>
      </div>

  </footer>
</html>
