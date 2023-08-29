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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios"; // axiosをインポート

const WriteReview = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand: props.brand || "",
    name: props.name || "",
    cat: "",
    satisfaction: 5,
    comment: ""
  });

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  // フォームデータを更新するハンドラー
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // レビューを投稿するハンドラー
  const handleSubmit = async () => {
		const convertedText = formData.comment.replace(/\\n/g, "\n")
		formData.comment = convertedText
		console.log(formData)
    try {
      // POSTリクエストを送信
      await axios.post("/api/createProduct", formData); // エンドポイントを適切なものに変更
      onClose(); // モーダルを閉じる
    } catch (error) {
      console.error("エラー:", error);
      // エラー処理を追加することができます
    }
  };

  return (
    <div>
      {props.name || props.brand ? (
        <Button leftIcon={<EditIcon />} size="sm" onClick={onOpen}>
          この商品のレビューを書く
        </Button>
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
              <Input
                placeholder="Fender"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                isRequired
              />

              <p>商品名</p>
              <Input
                placeholder="Stratocaster"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isRequired
              />

              <p>カテゴリ</p>
              <Select
                placeholder="カテゴリを選択"
                name="cat"
                value={formData.cat}
                onChange={handleInputChange}
              >
                <option value="Guitar">Guitar</option>
                <option value="Bass">Bass</option>
                <option value="Drum">Drum</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Pedal">Pedal</option>
                <option value="Other">Other</option>
              </Select>

              <p>満足度</p>
              <NumberInput
                name="satisfaction"
                value={formData.satisfaction}
                onChange={(valueString) =>
                  setFormData({
                    ...formData,
                    satisfaction: parseInt(valueString)
                  })
                }
                min={1}
                max={5}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <p>コメント</p>
              <Textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </div>
          </ModalBody>
          <Button onClick={handleSubmit}>投稿</Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WriteReview;
