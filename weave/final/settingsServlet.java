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
        
        //String driver = "org.mariadb.jdbc.Driver";
        String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(settingsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

        //String dbURL = "jdbc:mariadb://localhost:3306/apollo5_sterling";
        String dbURL = "jdbc:mysql://localhost:3306/apollo5_proj5";
        String username = "apollo5";
        String password = "7533213352";
        java.sql.Connection connection;
        
        
        
        // TODO: this takes in the genre and then processes it.
        // What needs to happen is either make a seprate condition for 'tag'
        // or set it up so that the tag will be processed with the same code
        // and just select which below with the boolean option in the UserSettings class. 
        // I just didn't get around to it
        String url = "/settings.jsp";
        if (action.equals("genre")) {
            String genreName = request.getParameter("button");
            
            // get session settings object containing genres
            HttpSession session = request.getSession();
            UserSettings settings = (UserSettings) session.getAttribute("settings");
            
            // if it does not exist, create a new one
            if(settings == null) {
                settings = new UserSettings();
            }
            
            // TODO: The current way things are set up is the settings is redirected
            // each time a genre is saved. It needs to be set up so that the genres/tags
            // are selected, use javascript to indicate it and when the user clicks save
            // all of the selections are sent to the servlet and then saved into the database.
            // The playlists should also change based on the updated settings.
            
            // TODO: what really needs to happen is when the user logs in, the 
            // java classes are populated based on what is inside the database
            try {
                connection = DriverManager.getConnection(dbURL, username, password);
                java.sql.Statement statement = connection.createStatement();
                
                // check to see if the settings contains the genre, if it does, remove it
                // otherwise add it to the settings list
                if(settings.containsData(genreName, false)) {
                    settings.removeData(genreName, false);
                    String sqlQuery = "DELETE FROM `GENRE_TAG` WHERE G_NAME='" + genreName + "';";
                    statement.executeUpdate(sqlQuery);
                } else {
                    int id = settings.addData(genreName, false);
                    String sqlQuery = "INSERT INTO `GENRE_TAG` (`G_NAME`, `G_ID`) VALUES ('" + genreName + "', '" + id +"');";
                    statement.executeUpdate(sqlQuery);
                }
                
                // TODO: ultimately the adding to the database only works on one
                // session, but the database is affected by all sessions which will
                // mess up the database or causes errors becasue the table for UID
                // Genre/name/etc needs to be used instead and we need to omit the settings
                // page for non-users
                
                statement.close();
                connection.close();
            } catch (SQLException ex) {
                Logger.getLogger(settingsServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
            
            // set the modified settings objecct back into the session
            session.setAttribute("settings", settings);
        
        }
        
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
