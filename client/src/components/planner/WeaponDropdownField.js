import { useGlobalState } from "../../context/GlobalState";
import PlannerDropdownItem from "./PlannerDropdownItem";

function WeaponDropdownField ({weapons, slot}) {
    const [state, dispatch] = useGlobalState();

    const weaponTypes = [ 
        "Dagger", 
        "Straight Sword", 
        "Greatsword", 
        "Colossal Sword", 
        "Curved Sword", 
        "Curved Greatsword", 
        "Katana", 
        "Twinblade", 
        "Thrusting Sword", 
        "Heavy Thrusting Sword", 
        "Axe", 
        "Greataxe", 
        "Hammer", 
        "Great Hammer", 
        "Flail", 
        "Spear", 
        "Great Spear", 
        "Halberd", 
        "Reaper", 
        "Fist", 
        "Claw", 
        "Whip", 
        "Colossal Weapon", 
        "Light Bow", 
        "Bow", 
        "Greatbow", 
        "Crossbow", 
        "Ballista", 
        "Glintstone Staff", 
        "Sacred Seal", 
        "Small Shield", 
        "Medium Shield", 
        "Greatshield", 
        "Torch" 
    ]

    return (
        <div className="col-md-4">
            <PlannerDropdownItem
                menuName={`Slot ${slot}`}
                sourceArray={weapons}
                nestedArray={weaponTypes}
                keyName="weapons"
                index={slot - 1}
            />
        </div>
    )
}

export default WeaponDropdownField;