import logo from '../assets/SidestreetBurgers_FINAL_Icon+Only.png'

export default function Header(){
    return(
        <div>
            <h1>
                Dough Tracker
                <img src={logo} width="80" height="80"></img>
            </h1>
        </div>
    );
}