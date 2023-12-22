import { FC, ReactNode } from "react";
import {
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
	Typography,
} from "@mui/material";

import { Preferences } from "../../types";

type PreferenceItemProps = {
	slotAction: ReactNode;
	label: string;
	explanation: string;
};
const PreferenceItem: FC<PreferenceItemProps> = (
	props,
) => {
	const { slotAction, label, explanation } =
		props;

	return (
		<ListItem alignItems="center">
			<ListItemText secondary={explanation}>
				<Typography>{label}</Typography>
			</ListItemText>
			<ListItemSecondaryAction>
				{slotAction}
			</ListItemSecondaryAction>
		</ListItem>
	);
};

type FormPreferencesProps = {
	preferences: Preferences;
	onPrefernceChange: (
		next_prefrences: (
			prev_preferences: Preferences,
		) => Preferences,
	) => void;
};
export const FormPreferences: FC<
	FormPreferencesProps
> = (props) => {
	const { preferences, onPrefernceChange } =
		props;

	return (
		<List disablePadding>
			<PreferenceItem
				label="Prefer even array"
				explanation="Subtract one facilities from an array to make it even."
				slotAction={
					<Switch
						checked={preferences["preferEven"]}
						onClick={() => {
							onPrefernceChange((prev) => {
								const next = { ...prev };
								next["preferEven"] =
									!prev["preferEven"];
								return next;
							});
						}}
					/>
				}
			/>
			<PreferenceItem
				label="Keep output belts under max load"
				explanation="Subtract one to keep output belt under its maximal capacity."
				slotAction={
					<Switch
						checked={
							preferences["keepBeltUnderMaxFlow"]
						}
						onClick={() => {
							onPrefernceChange((prev) => {
								const next = { ...prev };
								next["keepBeltUnderMaxFlow"] =
									!prev["keepBeltUnderMaxFlow"];
								return next;
							});
						}}
					/>
				}
			/>
			<PreferenceItem
				label="Proliferate Product"
				explanation="Take into account consumption of spraying Proliferator on products."
				slotAction={
					<Switch
						checked={
							preferences["proliferateProducts"]
						}
						onClick={() => {
							onPrefernceChange((prev) => {
								const next = { ...prev };
								next["proliferateProducts"] =
									!prev["proliferateProducts"];
								return next;
							});
						}}
					/>
				}
			/>
		</List>
	);
};
