import { useState } from "react";

import {
  reviewGrievance,
  resolveGrievance,
  rejectGrievance,
} from "../services/grievances/grievance.service";

function useDepartmentGrievanceActions() {
  const [loading, setLoading] = useState(false);

  const review = async (id, remarks) => {
    try {
      setLoading(true);

      const response = await reviewGrievance(id, {
        remarks,
      });

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const resolve = async (id, remarks) => {
    try {
      setLoading(true);

      const response = await resolveGrievance(id, {
        remarks,
        resolution: remarks,
      });

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const reject = async (id, remarks) => {
    try {
      setLoading(true);

      const response = await rejectGrievance(id, {
        remarks,
      });

      return response.data;
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
