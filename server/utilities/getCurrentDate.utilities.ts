const date = new Date();

const formatData = (input: any) => {
	if (input > 9) {
	  return input;
	} else return `0${input}`;
  };

const formatHour = (input: any) => {
	if (input > 12) {
	  return input - 12;
	}
	return input;
  };

const dateFormat = {
	dd: formatData(date.getDate()),
	mm: formatData(date.getMonth() + 1),
	yyyy: date.getFullYear(),
	HH: formatData(date.getHours()),
	hh: formatData(formatHour(date.getHours())),
	MM: formatData(date.getMinutes()),
	SS: formatData(date.getSeconds()),
}

const getDate = ({ dateFormat })