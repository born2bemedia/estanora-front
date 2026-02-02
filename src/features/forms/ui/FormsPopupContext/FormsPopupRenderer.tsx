"use client";

import { useFormsPopupStore } from "@/features/forms/model/store";

import { MarketResearchPopup } from "../MarketResearchPopup/MarketResearchPopup";
import { PropertyConsultationPopup } from "../PropertyConsultationPopup/PropertyConsultationPopup";
import { RequestPopup } from "../RequestPopup/RequestPopup";

export function FormsPopupRenderer() {
  const popupType = useFormsPopupStore((state) => state.popupType);
  const requestName = useFormsPopupStore((state) => state.requestName);
  const closePopup = useFormsPopupStore((state) => state.closePopup);

  return (
    <>
      <MarketResearchPopup
        isOpen={popupType === "market-research"}
        onClose={closePopup}
        onReturnHome={closePopup}
      />
      <PropertyConsultationPopup
        isOpen={popupType === "property-consultation"}
        onClose={closePopup}
        onReturnHome={closePopup}
      />
      {popupType === "request" && requestName && (
        <RequestPopup
          name={requestName}
          isOpen
          onClose={closePopup}
          onReturnHome={closePopup}
        />
      )}
    </>
  );
}
