export default function Logout() {

  const logout = () => {
    localStorage.setItem('user', '')
  }

  logout()

  return (
    <div className="flex flex-col items-center justify-center bg-3 min-h-screen">
      <h1 className="font-bold text-3xl mb-4">Food Shuffle</h1>
      <h1 className="font-medium text-xl mb-2">You are logged out.</h1>
      <button className="bg-4 my-5 hover:bg-5 font-bold py-2 px-8 text-lg shadow border rounded"><a href="/">Login or Sign Up</a></button>

  </div>
  );
}