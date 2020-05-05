import React from 'react'

const LoginForm = () => {

  return (
    <>
      <div className={'d-flex flex-row pt-4 justify-content-between mt-4'}>
        <div style={{maxHeight: '300px'}} className={'container border flex-column col-md-3 p-4'}>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control line-input" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">enter email</small>
          </div>

          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Password</label>
            <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">enter password

            </small>
          </div>
        </div>

      </div>
    </>
  )

}

export default LoginForm
