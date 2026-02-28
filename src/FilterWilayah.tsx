import { useLoaderData, useSearchParams } from "react-router-dom";

// definition
type Province = {
  id: number;
  name: string;
};

type Regency = {
  id: number;
  name: string;
  province_id: number;
};

type District = {
  id: number;
  name: string;
  regency_id: number;
};

type LoaderData = {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
};


export default function FilterWilayah() {
  const { provinces, regencies, districts } = useLoaderData() as LoaderData;

  const [searchParams, setSearchParams] = useSearchParams();

  const provinceId = searchParams.get("province");
  const regencyId = searchParams.get("regency");
  const districtId = searchParams.get("district");

  // filter regency based on province_id
  const filterRegency = provinceId ? regencies.filter((r) => r.province_id === Number(provinceId)) : []; 

  // filter district based on regency_id
  const filterDistrict = regencyId ? districts.filter((d) => d.regency_id === Number(regencyId)) : []; 


  const selectedProvince = provinces.find((p) => p.id === Number(provinceId));

  const selectedRegency = regencies.find((r) => r.id === Number(regencyId));

  const selectedDistrict = districts.find((d) => d.id === Number(districtId));

  
  function updateParam(key: string, value: string | null) {
    const newParams = new URLSearchParams(searchParams);

    if (!value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    // reset all child when province changed
    if (key === "province") {
      newParams.delete("regency");
      newParams.delete("district");
    }

    // reset district when regency changed
    if (key === "regency") {
      newParams.delete("district");
    }

    setSearchParams(newParams);
  }

  function resetFilter() {
    setSearchParams({});
  }

  return (
    <div className="w-screen h-full lg:h-screen flex flex-col lg:flex-row bg-white text-gray-800">
        <div className="w-full lg:w-[25%] flex flex-col border-r border-gray-300">
            <div className="h-[10%] font-bold text-[20px] flex items-center px-5">
                Frontend Assessment
            </div>
            <div className="h-[90%] p-5">
                <div className="uppercase mb-10 tracking-widest text-[14px]">
                    Filter wilayah
                </div>
                {/* FILTER */}
                <div className="mb-[30px]">
                    <div className="text-[18px] font-bold uppercase">Provinsi</div>
                    <div>
                        <select
                            name="province"
                            value={provinceId ?? ""}
                            onChange={(e) =>
                                updateParam("province", e.target.value || null)
                            }
                            className="bg-white rounded-lg border border-[#333333] py-[10px] px-[5px] w-full">
                            <option value="">Pilih Provinsi</option>
                            {
                                provinces.map((itemProvince) => (
                                    <option key={itemProvince.id} value={itemProvince.id}>
                                        {itemProvince.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="mb-[30px]">
                    <div className="text-[18px] font-bold uppercase">Kota/Kabupaten</div>
                    <div>
                        <select
                            name="regency"
                            value={regencyId ?? ""}
                            onChange={(e) =>
                                updateParam("regency", e.target.value || null)
                            }
                            disabled={!provinceId} // disabled if provinced not selected yet
                            className="bg-white rounded-lg border border-[#333333] py-[10px] px-[5px] w-full disabled:bg-gray-100">
                            <option value="">Pilih Kota/Kabupaten</option>
                            {
                                filterRegency.map((itemRegency) => (
                                    <option key={itemRegency.id} value={itemRegency.id}>
                                        {itemRegency.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="mb-[30px]">
                    <div className="text-[18px] font-bold uppercase">Kecamatan</div>
                    <div>
                        <select
                            name="district"
                            value={districtId ?? ""}
                            onChange={(e) =>
                                updateParam("district", e.target.value || null)
                            }
                            disabled={!regencyId} // disable if regency not selected yet
                            className="bg-white rounded-lg border border-[#333333] py-[10px] px-[5px] w-full disabled:bg-gray-100">
                            <option value="">Pilih Kecamatan</option>
                            {
                                filterDistrict.map((itemDistrict) => (
                                    <option key={itemDistrict.id} value={itemDistrict.id}>
                                        {itemDistrict.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <button
                        onClick={resetFilter}
                        className="w-full bg-[#e6f3f8] text-gray px-4 py-2 rounded-lg border-[#0984e3]"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
        <div className="mt-[30px] lg:mt-[0] w-full lg:w-[75%] flex flex-col">
            {/* BREADCRUMB */}
            <div className="breadcrumb h-[10%] text-base flex items-center px-5 border-b border-[#bdc3c7] text-[14px]">
                Indonesia
                {selectedProvince?.name && ` > ${selectedProvince.name}`}
                {selectedRegency && ` > ${selectedRegency.name}`}
                {selectedDistrict && ` > ${selectedDistrict.name}`}
            </div>

            {/* MAIN */}
            <main className="h-[90%] flex items-center justify-center flex-col">
                {
                    selectedProvince?.name ? 
                        <div className="mb-[50px] flex items-center flex-col">
                            <div className="text-[#3498db] tracking-widest uppercase font-medium">Provinsi</div>
                            <div>
                                <h1>{selectedProvince?.name ?? "-"}</h1>
                            </div>
                        </div>
                        :
                        <div className="mb-[50px] flex items-center flex-col">
                            <h1>Indonesia</h1>
                        </div>
                }
                
                {
                    selectedRegency && 
                    <div className="mb-[50px] flex items-center flex-col">
                        <div className="text-[#3498db] tracking-widest uppercase font-medium">Kota / Kabupaten</div>
                        <div>
                            <h1>{selectedRegency?.name ?? "-"}</h1>
                        </div>
                    </div>
                }
                
                {
                    selectedDistrict &&
                    <div className="mb-[50px] flex items-center flex-col">
                        <div className="text-[#3498db] tracking-widest uppercase font-medium">Kecamatan</div>
                        <div>
                            <h1>{selectedDistrict?.name ?? "-"}</h1>
                        </div>
                    </div>
                }
                
            </main>
        </div>
    </div>
  );
}