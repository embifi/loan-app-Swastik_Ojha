import React, { useState } from 'react';
import Login from './components/Login';

import LoanTypeList from './components/LoanTypeList';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("")
  const [loanTypes, setLoanTypes] = useState([]);
  console.log(isLoggedIn)
  return (
    <div>
      {!isLoggedIn ? (
        <Login setLoggedIn={setLoggedIn} setToken={setToken} />
      ) :
        isLoggedIn && <LoanTypeList loanTypes={loanTypes} token={token} setLoanTypes={setLoanTypes} />}
    </div>
  );
}

export default App;
