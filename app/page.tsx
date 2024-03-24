export default function Home() {
  return (
    <main className="flex flex-col justify-center  gap-10 items-center h-full text-4xl">
      <h4>Services we offer:</h4>

      <div className="relative overflow-x-auto">
        <table className="w-full text-lg text-left rtl:text-right text-gray-500">
          <thead className="text-2xl text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name of the test
              </th>
              <th scope="col" className="px-6 py-3">
                Complus Lab Facility
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td className="px-6 py-4">ESD IEC 61000-4-2</td>
              <td className="px-6 py-4">
                Electro Static Discharge (Contact Discharge:Max 30kV, Air
                discharge : Max 30kV)
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                2
              </th>
              <td className="px-6 py-4">EFT IEC 61000-4-4</td>
              <td className="px-6 py-4">
                Electric Fast Transients (Max 5.5 kV, Single Phase AC CDN Max
                16A & DC 10A ) Power Port (both AC & DC) / I/O Lines
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                3
              </th>
              <td className="px-6 py-4">SURGE IEC 61000-4-5</td>
              <td className="px-6 py-4">
                Surge ( Max 5kV, Single Phase AC CDN Max 16A & DC 10 A ) Power
                Port (both AC & DC)
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                4
              </th>
              <td className="px-6 py-4">CS IEC 61000-4-6</td>
              <td className="px-6 py-4">
                Conducted Susceptibility / Conducted Immunity ( Range: 0.15 MHz
                - 80MHz; Single Phase AC CDN Max 16A )
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                5
              </th>
              <td className="px-6 py-4">PFS IEC 61000-4-11/29</td>
              <td className="px-6 py-4">
                Power Fail Simulation ( Voltage Dip test,, Single Phase AC Max
                16A & DC 10A) Power Port (both AC & DC)
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                6
              </th>
              <td className="px-6 py-4">CE CISPR 11-22</td>
              <td className="px-6 py-4">
                Conducted Emission (LISN Cabability is Max 32 Amp for AC Single
                / Three Phase and DC )
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                7
              </th>
              <td className="px-6 py-4">RE EN 55022- Class-B</td>
              <td className="px-6 py-4">
                Radiated Emission 30 MHz - 3 GHz range for 3 meter antenna
                distance to the EUT
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                8
              </th>
              <td className="px-6 py-4">RS IEC 61000-4-3</td>
              <td className="px-6 py-4">
                Radiated Immunity / Susceptibility 1V/m, 3V/m, 10V/m ( 80-
                3000MHz)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
