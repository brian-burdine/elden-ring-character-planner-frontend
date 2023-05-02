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
        },
        {
            name: "Stamina",
            calc: calculateStam
        },
        {
            name: "Maximum Equip Load",
            calc: calculateMaxEquip
        },
        {
            name: "Discovery",
            calc: calculateDiscovery
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

    function calculateStam () {
        let currEnd = startingClass.attributes[2].base_value
            + state.currentCharacter.leveledAttributes["Endurance"].value;
        let maxStam = 0;

        if (currEnd > 0 && currEnd <= 15) {
            maxStam = Math.floor(((currEnd - 1) / 14) * 25 + 80);
        } else if (currEnd > 15 && currEnd <= 35) {
            maxStam = Math.floor(((currEnd - 15) / 15) * 25 + 105);
        } else if (currEnd > 35 && currEnd <= 60) {
            maxStam = Math.floor(((currEnd - 30) / 20) * 25 + 130);
        } else if (currEnd > 60 && currEnd <= 99) {
            maxStam = Math.floor(((currEnd - 50) / 49) * 15 + 155);
        } else {
            maxStam = "Invalid Endurance Attribute";
        }

        return maxStam;
    }

    function calculateMaxEquip () {
        let currEnd = startingClass.attributes[2].base_value
            + state.currentCharacter.leveledAttributes["Endurance"].value;
        let maxEquip = 0;

        if (currEnd > 0 && currEnd <= 25) {
            maxEquip = Math.round((((currEnd - 8) / 17) * 27 + 45) * 10) / 10;
        } else if (currEnd > 25 && currEnd <= 60) {
            maxEquip = Math.round(((((currEnd - 25) / 35) ** 1.1) * 48 + 72) * 10) / 10;
        } else if (currEnd > 60 && currEnd <= 99) {
            maxEquip = Math.round((((currEnd - 60) / 39) * 40 + 120) * 10) / 10;
        } else {
            maxEquip = "Invalid Endurance Attribute";
        }

        return maxEquip;
    }

    function calculateDiscovery () {
        let currArc = startingClass.attributes[7].base_value
            + state.currentCharacter.leveledAttributes["Arcane"].value;
        let discovery = 0;

        if (currArc > 0 && currArc <= 99) {
            discovery = currArc + 100;
        } else {
            discovery = "Invalid Arcane Attribute";
        }

        return discovery;
    }

    return (
        <div className="vstack gap-2">
            {
                baseStats.map((stat) => {
                    return (
                        <div className="hstack justify-content-between">
                            <p>{stat.name}</p>
                            <p>{stat.calc()}</p>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default BasicDerivedStatistics;