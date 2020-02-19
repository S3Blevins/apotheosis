/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import beans.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author sterling
 */
public class settingsServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        String userID = request.getParameter("userID");
        
        String url = "/settings.jsp";
        
        String driver = "org.mariadb.jdbc.Driver";
        //String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(settingsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

        //TODO: establish it so that the database is not opened unless they have a valid ID
        
        String dbURL = "jdbc:mariadb://localhost:3306/apollo5_proj5";
        //String dbURL = "jdbc:mysql://localhost:3306/apollo5_proj5";
        String username = "apollo5";
        String password = "7533213352";
        java.sql.Connection connection;
            
        // get session settings object containing genres
        HttpSession session = request.getSession();
        UserSettings settings = (UserSettings) session.getAttribute("settings");

        boolean newSettingsFlag = false;
        // if it does not exist, create a new one
        if(settings == null) {
            settings = new UserSettings();
            newSettingsFlag = true;
            
        }

        try {
            // initialize the connection for the database
            connection = DriverManager.getConnection(dbURL, username, password);
            java.sql.Statement statement = connection.createStatement();
            
            if(action.equals("home")) {
                url = "/home.jsp";
            } else if(action.equals("visualize")) {
                url = "/visualize.jsp";
            } else if((action.equals("settings") || action.equals("playlists")) && newSettingsFlag == true && userID != null) {
                // Condition for if the user has just visited the site and no settings history is saved
                // The objects used to create the playlists and preserve the settings in the settings
                // page are built from the database.
                
                // query finds all rows associated with a user ID
                String sqlFindQuery = "SELECT * FROM `SETTINGS` WHERE U_ID=" + userID + ";";
                // query result set
                ResultSet rs = statement.executeQuery(sqlFindQuery);
                
                // start to build settings session data from database
                while(rs.next()) {
                    String type = rs.getString("TYPE");
                    if(type.equals("genre")) {
                        settings.addGenre(rs.getString("QUALITY"), rs.getInt("ORDER"));
                    } else if(type.equals("tag")) {
                        settings.addTag(rs.getString("QUALITY"), rs.getInt("ORDER"));
                    }
                }
                
                // either settings.jsp or playlist.jsp
                url = "/" + action + ".jsp";
            } else if(action.equals("playlists")) {
                // if settings are already preserved in playlist
                url ="/playlists.jsp";
            } else if(action.equals("save")) {
                // Condition for if the user is now saving their updated settings
                // The database is wiped of settings details and is rebuilt
                String tagString = request.getParameter("tagArray");
                String[] tagArray = tagString.split(",");

                String genreString = request.getParameter("genreArray");
                String[] genreArray = genreString.split(",");

                System.out.println(tagString);
                System.out.println(genreString);
                
                // More efficient to rebuild list from scratch than to change
                // the preference order
                settings.clearLists();
                
                // delete and insert is faster for SQL look-up than to update the tables
                // only done if a valid user
                if(userID != null) {
                    String sqlDeleteQuery = "DELETE FROM `SETTINGS` WHERE U_ID='" + userID+ "';";
                    statement.executeUpdate(sqlDeleteQuery);
                }
                
                // initialized so that it doesn't keep getting garbage collected
                String sqlUpdateQuery = "";
                
                for(int i = 0; i < genreArray.length; i++) {
                    // add new genre to list
                    settings.addGenre(genreArray[i], i);

                    if(userID != null && genreArray[i] != null) {
                        // write the new row to the database, but only if a valid user
                        sqlUpdateQuery = "INSERT INTO SETTINGS " + "(`U_ID`, `TYPE`, `QUALITY`, `ORDER_NUM`) " + "VALUES ('" + userID + "', '" + "genre" + "', '" + genreArray[i] + "', '" + i + "');";
                        System.out.println(sqlUpdateQuery);
                        statement.executeUpdate(sqlUpdateQuery);
                    }
                }

                for(int i = 0; i < tagArray.length; i++) {
                    // add new tag to list
                    settings.addTag(tagArray[i], i);

                    // write the new row to the database, but only if a valid user
                    if(userID != null && tagArray[i] != null) {
                        sqlUpdateQuery = "INSERT INTO SETTINGS " + "(`U_ID`, `TYPE`, `QUALITY`, `ORDER_NUM`) " + "VALUES ('" + userID + "', '" + "tag" + "', '" + tagArray[i] + "', '" + i + "');";
                        System.out.println(sqlUpdateQuery);
                        statement.executeUpdate(sqlUpdateQuery);
                    }
                }
            }

            // TODO make it so that the database connection is established when the user clicks playlist
            System.out.println(settings.getGenreCount());
            System.out.println(settings.getTagsCount());
            
            statement.close();
            connection.close();
        } catch (SQLException ex) {
            Logger.getLogger(settingsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

        // set the modified settings objecct back into the session
        session.setAttribute("settings", settings);
        

        // uses the url and forwards it, like a link
        RequestDispatcher dispatcher = request.getRequestDispatcher(url);
        dispatcher.forward(request, response);
        
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
