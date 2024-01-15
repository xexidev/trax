import logo from '/img/logo.svg'

export default function Header () {
  return (
    <header className="header">
      <h1><img className="logo" src={logo} alt="Trax" title="Trax, a React micro Drumkit Rhythm Box" /> Trax</h1>
      <h2>a React micro Drumkit Rhythm Box</h2>
    </header>
  )
}
