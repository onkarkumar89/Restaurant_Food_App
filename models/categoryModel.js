const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F859343172643202710%2F&psig=AOvVaw0DfSon4EkHVOndS7zaUh6q&ust=1712000912691000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJjdgM2in4UDFQAAAAAdAAAAABAE",
    },
  },

  { timestamps: true }
);
// exports
module.exports = mongoose.model("category", categorySchema);
