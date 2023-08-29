import React, { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	Select,
	NumberInputField,
	NumberInput,
	NumberInputStepper,
	NumberIncrementStepper, 
	NumberDecrementStepper,
	Textarea
} from "@chakra-ui/react";

import { EditIcon } from '@chakra-ui/icons'


const WriteReview = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const onOpen = () => setIsOpen(true);
	const onClose = () => setIsOpen(false);

	return (
		<div>

			{props.name || props.brand ? (
				<Button leftIcon={<EditIcon />} size="sm" onClick={onOpen}>この商品のレビューを書く</Button>
			) : (
				<EditIcon onClick={onOpen} />
			)}


			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>レビューを書く</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div>

							<p>ブランド</p>
							<Input placeholder='Fender' defaultValue={props.brand} isRequired />

							<p>商品名</p>
							<Input placeholder='Stratocaster' defaultValue={props.name} isRequired />

							<p>カテゴリ</p>
							<Select placeholder='カテゴリを選択' defaultValue={props.cat}>
								<option value='Guitar'>Guitar</option>
								<option value='Bass'>Bass</option>
								<option value='Drum'>Drum</option>
								<option value='Keyboard'>Keyboard</option>
								<option value='Pedal'>Pedal</option>
								<option value='Other'>Other</option>
							</Select>

							<p>満足度</p>
							<NumberInput defaultValue={5} min={1} max={5}>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>

							<p>コメント</p>
							<Textarea />
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default WriteReview;
