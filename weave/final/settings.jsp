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

      .tagDisabled {
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

      .tagEnabled {
        background-color: #1f2833;
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

      .genreDisabled {
        background-size: 110px;
        border: solid 5px white;
        width: 110px;
        height: 110px;
        color: white;
        margin-bottom: 10px;
      }

      .genreEnabled {
        background-size: 110px;
        border: solid 5px white;
        width: 110px;
        height: 110px;
        color: black;
        margin-bottom: 10px;
        background-color: black;
        opacity: 0.3;
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

      #genreBlock {
          position: relative;
            width: 110px;
            height: 110px;
          text-align: center;
                  margin-bottom: 10px;
      }

      .genreText {
          top: 50%;
          left: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
      }

    </style>
  </head>

  <body onload="alreadySelectedGenre(); alreadySelectedTag(); hideSettings();">
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fn" uri="/WEB-INF/tlds/newtag_library.tld" %>
    <%@ taglib prefix = "fx" uri = "http://java.sun.com/jsp/jstl/functions" %>

    <!-- JavaScript Links need to be in the body (requires Jquery) -->
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
    <script src="script.js"></script>
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
              <form id="option" action="settingsServlet" method="post">
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
              <form class="active" id="option" action="settingsServlet" method="post">
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


    <div class="container overflow-auto">
      <div class="row" style="margin-top: 40px;">

        <div class="page-header">
          <h1>settings <small>music to your taste</small></h1>
        </div>

        <div class="col-lg-12" style="background-color: #c7c7c7;">
          <h1>genres and themes</h1>

          <div class="col-lg-8">

              <c:forEach var="genre" items="${settings.genreList}">
                <div class="col-xs-3 col-md-2">
                    <div id="genreBlock">
                  <img
                      <c:choose>
                        <c:when test="${fn:contains(settings.genres, genre)}">
                            class="genreEnabled"
                        </c:when>
                        <c:otherwise>
                            class="genreDisabled"
                        </c:otherwise>
                        </c:choose>
                      id="${genre}" src="media/genres/${fx:toLowerCase(genre)}.jpeg" onclick="selectedItem(this.id, 'genre')"/>

                  <div class="genreText">${genre}</div>
                    </div>
                </div>


              </c:forEach>
          </div>

          <div class="panel-body col-lg-4" id="genres">

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

          <div class="col-lg-8" style="background-color: #c7c7c7; padding-bottom: 10px;">
            <h1>moods or tags</h1>
              <c:forEach var="tag" items="${settings.tagList}">
                <span
                      <c:choose>
                        <c:when test="${fn:contains(settings.tags, tag)}">
                            class="tagEnabled"
                        </c:when>
                        <c:otherwise>
                            class="tagDisabled"
                        </c:otherwise>
                        </c:choose>
                      id="${tag}" onclick="selectedItem(this.id, 'tag')">${tag}</span>
              </c:forEach>


          </div>

          <div class="panel-body col-lg-4" id="tags">

          </div>

          <form action="settingsServlet" method="post">
            <input type="hidden" name="action" value="save" />
            <input type="hidden" name="tagArray" id="tagArray" value="" />
            <input type="hidden" name="genreArray" id="genreArray" value="" />
            <input type="hidden" name="userID" id="userID" value="" />
            <input type="submit" name="button" value="SAVE SETTINGS"/>
          </form>

        </div>

      </div>
    </div>


    <script>
      // acquire access token to behave as the index for our database.
      var userID = sessionStorage.getItem("userID");
      console.log(userID);
      // array containing the genres wanted by the user
      var userGenres = [];
      // array containing the tags wanted by the user
      var userTags = [];


      function alreadySelectedGenre() {
        var alreadyEnabledGenre = document.getElementsByClassName("genreEnabled");

        for(var i = 0; i < alreadyEnabledGenre.length; i++) {
          userGenres.push(alreadyEnabledGenre[i].id);
        }

        document.getElementById("genres").innerHTML = userGenres;
      }

      function alreadySelectedTag() {
        var alreadyEnabledTag = document.getElementsByClassName("tagEnabled");

        for(var i = 0; i < alreadyEnabledTag.length; i++) {
          userTags.push(alreadyEnabledTag[i].id);
        }

        document.getElementById("tags").innerHTML = userTags;
      }


      function selectedItem(clickedID, type) {
        var array;

        // switch array based on what type so code can be reused
        if(type == "genre") {
          array = userGenres;
        } else {
          array = userTags;
        }

        // genreDisabled -> Not wanted by the user
        // genreEnabled -> Wanted by the user and opacity CSS changed
        if(document.getElementById(clickedID).className == type + "Disabled") {
          // add the selected item to the list
          array.push(clickedID);
          // change the appearance of the selected genres
          document.getElementById(clickedID).className =  type + "Enabled";
          // alter the genre list on the side
          document.getElementById(type + "s").innerHTML = array;
        } else {
          // remove the un-selected genre
          array.splice(array.indexOf(clickedID), 1);
          // change the appearance fot the unselected genres
          document.getElementById(clickedID).className = type + "Disabled";
          // alter the list on the side
          document.getElementById(type + "s").innerHTML = array;
        }

        document.getElementById("tagArray").value = userTags;
        document.getElementById("genreArray").value = userGenres;
        document.getElementById("userID").value = userID;
      }

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
