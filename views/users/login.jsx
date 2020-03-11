var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        <body>     
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "700px"}}>       
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "500px"}}>
                    <div>
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
                      </li>
                    </ul>
                    </div>
                    <div class="tab-content d-flex justify-content-center" id="pills-tabContent">
                      <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                      <form method = "POST" action = "/login">
                          <div class="form-group" style = {{textAlign: "center"}}>
                            <label for="exampleInputEmail1" >Username</label>
                            <input type="text" class="form-control" name="username" aria-describedby="emailHelp" placeholder="Enter Username"/>
                          </div>
                          <div class="form-group" style = {{textAlign: "center"}}>
                            <label for="exampleInputPassword1" >Password</label>
                            <input type="password" class="form-control" name="password" placeholder="Password"/>
                          </div>
                          <div style={{display: "flex", justifyContent: "center"}}>
                          <button type="submit" class="btn btn-primary">Submit</button>
                          </div>
                        </form>
                      </div>

                      <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                            <form method = "POST" action = "/register">
                              <div class="form-group" style = {{textAlign: "center"}}>
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" class="form-control" name="username" aria-describedby="emailHelp" placeholder="Enter Username"/>
                              </div>
                              <div class="form-group" style = {{textAlign: "center"}}>
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" name="password" placeholder="Password"/>
                              </div>
                              <div style={{display: "flex", justifyContent: "center"}}>
                              <button type="submit" class="btn btn-primary">Submit</button>
                              </div>
                            </form>
                     </div>
                </div>
            </div>
        </div>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Login;