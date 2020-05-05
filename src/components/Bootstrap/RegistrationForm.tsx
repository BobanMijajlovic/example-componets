import React from 'react'

const RegistrationForm = () => {
  return (
    <>

      <div className={'container border flex-column col-md-3 mt-4 pt-4'}>
        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Account code</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">enter account code
                        else.
          </small>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">User name</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">Enter user name

          </small>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Password</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">enter password

          </small>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Confirm password</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">confirm password

          </small>
        </div>
      </div>

    </>
  )
}

export default RegistrationForm
