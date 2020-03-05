var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>              
                            <form method = "POST" action = "/register">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" class="form-control" name="username" aria-describedby="emailHelp" placeholder="Enter Username"/>
                              </div>
                              <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" name="password" placeholder="Password"/>
                              </div>
                              <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
