import { useSearchParams } from "react-router-dom";

import { LOCALES, STORAGE_KEY } from "../../config";
import { getFromStorage } from "../../utils/localeStorage";

export const useDefaultContext = () => {
	const [ searchParams ] = useSearchParams();

	return {
		locale: getFromStorage(STORAGE_KEY) || searchParams.get('locale') || LOCALES.ENGLISH,
	}
}