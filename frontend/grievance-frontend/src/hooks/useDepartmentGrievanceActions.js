import { useState } from "react";

import {
  reviewGrievance,
  resolveGrievance,
  rejectGrievance,
} from "../services/grievances/grievance.service";

function useDepartmentGrievanceActions() {
  const [loading, setLoading] = useState(false);

  const review = async (id, remarks) => {
    setLoading(true);

    try {
      await reviewGrievance(id, { remarks });
    } finally {
      setLoading(false);
    }
  };

  const resolve = async (id, remarks) => {
    setLoading(true);

    try {
      await resolveGrievance(id, { remarks });
    } finally {
      setLoading(false);
    }
  };

  const reject = async (id, remarks) => {
    setLoading(true);

    try {
      await rejectGrievance(id, { remarks });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    review,
    resolve,
    reject,
  };
}

export default useDepartmentGrievanceActions;
