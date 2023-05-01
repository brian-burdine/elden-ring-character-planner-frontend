import { useGlobalState } from "../../context/GlobalState";

function BasicDerivedStatistics ({ startingClasses }) {
    const [state, dispatch] = useGlobalState();

    let startingClass = {};
    if (startingClasses.length > 0) {
        startingClass = startingClasses.filter((sc) => {
            return sc.id == state.currentCharacter.startingClass
        })[0];
    }

    const baseStats = [
        {
            name: "HP",
            calc: calculateHP
        }, 
        {
            name: "FP",
            calc: calculateFP
        }
    ];

    function calculateHP () {
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

    function calculateFP () {
        let currentMind = startingClass.attributes[1].base_value
            + state.currentCharacter.leveledAttributes["Mind"].value;
        let maxFP = 0;

        if (currentMind > 0 && currentMind <= 15) {
            maxFP = Math.floor(((currentMind - 1) / 14) * 45 + 50);
        } else if (currentMind > 15 && currentMind <= 35) {
            maxFP = Math.floor(((currentMind - 15) / 20) * 105 + 95);
        } else if (currentMind > 35 && currentMind <= 60) {
            maxFP = Math.floor((1 - (1 - ((currentMind - 35) / 25)) ** 1.2) * 150 + 200);
        } else if (currentMind > 60 && currentMind <= 99) {
            maxFP = Math.floor(((currentMind - 60) / 39) * 100 + 350);
        } else  {
            maxFP = "Invalid Mind Attribute";
        }

        return maxFP;
    }

    return (
        <div className="vstack gap-2">
            {
                baseStats.map((stat) => {
                    return (
                        <div className="hstack justify-content-between">
                            <strong>{stat.name}</strong>
                            <strong>{stat.calc()}</strong>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default BasicDerivedStatistics;