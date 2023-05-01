import WeaponDropdownField from "./WeaponDropdownField";


function WeaponsField ({weapons}) {
    const rightHandSlots = [1, 2, 3];
    const leftHandSlots = [4, 5, 6];

    return (
        <div className="container weapons">
            <div className="row">
                <p>Right Hand</p>
                {
                    rightHandSlots.map((slot) => {
                        return (
                            <WeaponDropdownField
                                key={`Right Hand ${slot}`} 
                                weapons={weapons}
                                slot={slot}
                            />
                        )
                    })
                }
            </div>
            <div className="row">
                <p>Left Hand</p>
                {
                    leftHandSlots.map((slot) => {
                        return (
                            <WeaponDropdownField
                                key={`Left Hand ${slot - 3}`}
                                weapons={weapons}
                                slot={slot}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WeaponsField;