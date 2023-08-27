import React from 'react'
import "./toast.css"
export default function Toast() {
  return (
    <div>
      <div class="wrapper">
    <div class="toast success">
        <div class="container-1">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="container-2">
            <p>Success</p>
            <p>Your Order placed successfully</p>
        </div>
        <button>&times;</button>
    </div>
    {/* <div class="toast error">
        <div class="container-1">
            <i class="fas fa-times-circle"></i>
        </div>
        <div class="container-2">
            <p>Error</p>
            <p>Error has occured while saving changes.</p>
        </div>
        <button>&times;</button>
    </div> */}
    {/* <div class="toast info">
        <div class="container-1">
            <i class="fas fa-info-circle"></i>
        </div>
        <div class="container-2">
            <p>Info</p>
            <p>New settings available on your account.</p>
        </div>
        <button>&times;</button>
    </div> */}
    {/* <div class="toast warning">
        <div class="container-1">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="container-2">
            <p>Warning</p>
            <p>Username you have entered is invalid.</p>
        </div>
        <button>&times;</button>
    </div> */}
</div>
    </div>
  )
}
