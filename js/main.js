document.getElementById("GenerateChartButton").addEventListener("click", handleCalculate);

const Resolution = 1;

function handleCalculate() {

    const Voltage = readNum("Voltage");
    const Amps = readNum("Amps");
    const Resistance = readNum("Resistance");
    const Inductance = readNum("Inductance");
    const StepsPerRevolution = readNum("StepsPerRevolution");

    const NumberOfTeeth = readNum("NumberOfTeeth");
    const DistanceBetweenTeeth = readNum("DistanceBetweenTeeth");

    const MaxRPM = readNum("MaxRPM");
    const SystemEfficiency = readNum("SystemEfficiency");

    const Inductance_H = Inductance / 1000;
    const ElectricalCyclesPerRevolution = StepsPerRevolution / 4;
    const MillimetresPerRevolution = NumberOfTeeth * DistanceBetweenTeeth;

    const PointsRPM = [];
    const PointsSpeed = [];

    for (let rpm = 0; rpm <= MaxRPM; rpm += Resolution) {
        const ElectricalFrequency = (rpm / 60) * ElectricalCyclesPerRevolution;
        const InductiveReactance = 2 * Math.PI * ElectricalFrequency * Inductance_H;
        const Impedance = Math.sqrt(
            Resistance * Resistance + InductiveReactance * InductiveReactance
        );
        const EffectiveCurrent = Math.min(Amps, Voltage / Impedance);
        const Power = (EffectiveCurrent * EffectiveCurrent * Impedance) / SystemEfficiency;
        const Speed = (rpm / 60) * MillimetresPerRevolution;

        PointsRPM.push({
            x: rpm,
            y: Power
        });
        PointsSpeed.push({
            x: Speed,
            y: Power
        });
    }

    updateCharts(PointsRPM, PointsSpeed);
}

function readNum(id) {
    return Number(document.getElementById(id).value);
}