import { useState, useCallback } from "react";
import Select from "react-select";
import { debounce } from "lodash";
import { mapService } from "@/services/api/map";

const SelectLocation = ({
  placeholder,
  setLocation,
  required,
}: {
  placeholder: string;
  setLocation: any;
  required?: boolean;
}) => {
  const [locationResults, setLocationResults] = useState([]);

  const fetchSearchResults = async (inputValue: string) => {
    if (!inputValue) {
      setLocationResults([]);
      return;
    }
    const response = await mapService.getSuggestLocations(inputValue);

    const options = response.data.predictions.map((prediction: any) => ({
      value: prediction.place_id,
      label: prediction.description,
    }));

    setLocationResults(options);
  };

  const debouncedFetchLocationResults = useCallback(
    debounce((inputValue: string) => fetchSearchResults(inputValue), 1000),
    []
  );

  const handleSelectLocation = async (selectedOption: any) => {
    if (!selectedOption) {
      setLocation(null);
      return;
    }

    const response = await mapService.getDetailLocation(selectedOption?.value);
    const { lat, lng } = response.data.result.geometry.location;

    setLocation({
      description: selectedOption.label,
      coordinates: [lat, lng],
    });
  };

  return (
    <Select
      options={locationResults}
      required={required}
      placeholder={placeholder}
      isClearable
      value={locationResults.find(
        (option: any) => option.label === setLocation?.description
      )}
      onChange={(selectedOption) => {
        handleSelectLocation(selectedOption);
      }}
      onInputChange={(inputValue) => {
        debouncedFetchLocationResults(inputValue);
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: "#9ca3af",
          boxShadow: "none",
        }),
      }}
    />
  );
};

export default SelectLocation;
