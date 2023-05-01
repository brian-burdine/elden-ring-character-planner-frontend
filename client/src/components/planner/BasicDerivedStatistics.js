import { useGlobalState } from "../../context/GlobalState";

function BasicDerivedStatistics ({ startingClasses }) {
    const [state, dispatch] = useGlobalState();

    let startingClass = {};
    if (startingClasses.length > 0) {
        startingClass = startingClasses.filter((sc) => {
            return sc.id == state.currentCharacter.startingClass
        })[0];
    }

    function calculateHp () {
        let currentVigor = startingClass.attributes[0].base_value
            + state.currentCharacter.leveledAttributes["Vigor"].value;
        let maxHP = 0;
        
        if (currentVigor > 0 && currentVigor <= 25) {
            maxHP = Math.floor((((currentVigor - 1) / 24) ** 1.5) * 500 + 300);
        } else if (currentVigor > 25 && currentVigor <= 40) {
            maxHP = Math.floor((((currentVigor - 25) / 15) ** 1.1) * 650 + 800);
        } else if (currentVigor > 40 && currentVigor <= 60) {
            maxHP = Math.floor((1 - (1 - (currentVigor - 40) / 20) ** 1.2) * 450 + 1450);
        } else if (currentVigor > 60 && currentVigor <= 99) {
            maxHP = Math.floor((1 - (1 - (currentVigor - 60) / 39) ** 1.2) * 200 + 1900);
        } else {
            maxHP = "Invalid Vigor Attribute";
        }

        return maxHP;
    }

    return (
        <div className="vstack gap-2">
            <div className="hstack justify-content-between">
                <strong>HP</strong>
                <strong>{calculateHp()}</strong>
            </div>
        </div>
    );
}

export default BasicDerivedStatistics;