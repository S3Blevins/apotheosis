<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <title>Apotheosis | SETTINGS</title>
    <link rel="shortcut icon" type="image/png" href="media/favicon.ico"/>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    <!-- Our own CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="genre_album_flip.css">

    <style>

      .tag {
        background-color: gray;
        max-height: 250px;
        max-width: 100px;
        margin: 3px;
        color: white;
        padding: 10px 10px 10px 10px;
        text-align: center;
        display: inline-block;
        font-size: 16px;
        border-radius: 80px;
      }

      .genre {
        background-size: 110px;
        border: solid 5px #FFFFFF;
        width: 110px;
        height: 110px;
        color: white;
        margin-bottom: 10px;
      }

      .footer {
        width: 100%;
        background-color: #1f2833;
        box-shadow: 0px -5px 5px grey;
        color: white;
      }

      .copyright {
        text-align: center;
        color: white;
      }

      #footer-links {
          list-style-type: none;
          text-decoration: none;
          text-align: left;
      }

    </style>
  </head>

  <body>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


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
              <a href="visualize.jsp"><span class="glyphicon glyphicon-stats"></span>VISUALIZE</a>
            </li>
            <li>
              <a href="playlists.jsp"><span class="glyphicon glyphicon-play-circle"></span>PLAYLISTS</a>
            </li>
            <li id="active">
              <a href="settings.jsp"><span class="glyphicon glyphicon-cog"></span>SETTINGS</a>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <div class="container overflow-auto">
      <div class="row" style="margin-top: 40px;">

        <div class="page-header">
          <h1>settings <small>music to your taste</small></h1>
        </div>

        <div class="col-lg-12" style="background-color: #c7c7c7;">
          <h1>genres and themes</h1>

          <div class="col-lg-8">
            <form action="settingsServlet" method="post">
              <input type="hidden" name="action" value="genre">
              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="ROCK" style="background-image: url('media/genres/rock.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="RAP" style="background-image: url('media/genres/rap.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="POP" style="background-image: url('media/genres/pop.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="CLASSICAL" style="background-image: url('media/genres/classical.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="COUNTRY" style="background-image: url('media/genres/country.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="GRUNGE" style="background-image: url('media/genres/grunge.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="TRAP" style="background-image: url('media/genres/trap.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="TECHNO" style="background-image: url('media/genres/techno.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="OLDIES" style="background-image: url('media/genres/oldies.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="ELECTRONIC" style="background-image: url('media/genres/electronica.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="WORLD" style="background-image: url('media/genres/world.jpeg');"/>
              </div>

              <div class="col-xs-3 col-md-2">
                <input class="genre" type="submit" name="button" value="METAL" style="background-image: url('media/genres/metal.jpeg');"/>
              </div>

            </form>
          </div>

          <div class="panel-body col-lg-4">
            <c:forEach var="genre" items="${settings.genres}">
              <p>${genre.name}</p>
            </c:forEach>
          </div>


          <div class="col-lg-6" style="background-color: #c7c7c7;">
            <h1>artists and albums</h1>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for artists and albums...">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">search</button>
              </span>
            </div>

            <div class="panel panel-default">
              <div class="panel-heading">Artists and Albums</div>
              <div class="panel-body">
                <p>List a series of artists or albums related to search results</p>
              </div>
            </div>
          </div>


          <div class="col-lg-8" id="tags" style="background-color: #c7c7c7; padding-bottom: 10px;">
            <h1>moods or tags</h1>
            <form action="settingsServlet" method="post">
              <input type="hidden" name="action" value="tag">
              <input class="tag" type="submit" name="button" value="focus"/>
              <input class="tag" type="submit" name="button" value="happy"/>
              <input class="tag" type="submit" name="button" value="upbeat"/>
              <input class="tag" type="submit" name="button" value="depressing"/>
              <input class="tag" type="submit" name="button" value="slow"/>
              <input class="tag" type="submit" name="button" value="fast"/>
              <input class="tag" type="submit" name="button" value="soothing"/>
              <input class="tag" type="submit" name="button" value="quiet"/>
              <input class="tag" type="submit" name="button" value="120bmp"/>
              <input class="tag" type="submit" name="button" value="sleep"/>
              <input class="tag" type="submit" name="button" value="exercise"/>
              <input class="tag" type="submit" name="button" value="driving"/>
            </form>
          </div>

        </div>

      </div>
    </div>

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
              <li><a href="home.jsp">HOME</a></li>
              <li><a href="visualize.jsp">VISUALIZE</a></li>
              <li><a href="playlist.jsp">PLAYLISTS</a></li>
              <li><a href="settings.jsp">SETTINGS</a></li>
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
