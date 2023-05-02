import WeaponDropdownField from "./WeaponDropdownField";


function WeaponsField ({weapons}) {
    const rightHandSlots = [1, 2, 3];
    const leftHandSlots = [4, 5, 6];

    return (
        <div className="container weapons">
            <div className="row mb-2">
                <h5>Right Hand</h5>
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
            <div className="row mb-2">
                <h5>Left Hand</h5>
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