"use client";
import * as Yup from "yup";

import Modal from "@/components/molecules/Modal";
import { UniversalFormikForm } from "@/components/templates/form";
import { useGlobalContext } from "@/context/GlobalContext";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./edtiCategoryForm";
import { postProduct, updateProduct } from "./handleSubmit";
import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";

export default function AddProductModal({
  params,
  selectedProduct,
  categories,
}: any) {
  const router = useRouter()
  const { data: globalData, setData } = useGlobalContext(),
    { isModalOpen } = globalData;
  const user = globalData.user || LocalStorageManager?.get("user");
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setData({ ...globalData, isModalOpen: false })}
      className=" rounded-none"
    >
      <UniversalFormikForm
        handleSubmit={(values, { resetForm }) => {
          !selectedProduct
            ? postProduct({ ...values, vendor: user.vendor })
            : updateProduct(values, () => {
                resetForm();
                setData({
                  ...globalData,
                  isModalOpen: !isModalOpen,
                });
              });
          resetForm();
          router.refresh();
        }}
        initialValues={
          selectedProduct ?? {
            name: "",
            status: "active",
            units: "",
            category: "",
            price: 0,
          }
        }
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Product name is required")
            .max(20, "Product name must be at most 20 characters"),
          units: Yup.string().required("Product unit is required"),
          status: Yup.string().oneOf(
            ["active", "pause"],
            "Invalid status selection"
          ),
          price: Yup.number().required("Price is required"),
          category: Yup.string().required("Category is required"),
        })}
      >
        {!selectedProduct ? (
          <AddProductForm categories={categories} />
        ) : (
          <EditProductForm handleSubmit={() => console.log("")} />
        )}
      </UniversalFormikForm>
    </Modal>
  );
}
