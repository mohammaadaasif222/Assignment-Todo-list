const Todo = require("../models/Todo");
const APIFeatures = require("../utils/APIFeatures");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
// Create new product
exports.newTodo = catchAsyncErrors(async (request, response) => {
  try {
    const todo = await Todo.create(request.body);
    response.status(201).json({success:true, todo});
  } catch (error) {
    response.status(401).json({
      success: false, 
      error,
    }); 
  }
});

// get all prodcuts

exports.getAllTodos = catchAsyncErrors(async (request, response, next) => {
  try {
    const countTodos = await Todo.countDocuments();
    const apiFeatures = new APIFeatures(Todo.find(), request.query)
      .search()
      .filter();
    const todos = await apiFeatures.query;
    response.status(200).json({
      success: true,
      size: todos.length,
      countTodos,
      todos,
    });
  } catch (error) {
    response.status(400).json({
      success: true,
      error: error.message,
    });
  }
});

// Update todo

exports.updateTodo = catchAsyncErrors(async (request, response, next) => {
  try {
    const todoId = request.params.id;

    let todo = await Todo.findById(todoId);
    if (!todo) {
      return next(new ErrorHandler("Todo not Found!", 404));
    }

    todo = await Todo.findOneAndUpdate({ _id: todoId }, request.body ,{
      new: true,
      useFindAndModify: false,
    });

    response.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    response.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete single product

exports.deleteTodo = catchAsyncErrors(async (request, response, next) => {
  try {
    const todoId = request.params.id;

    const result = await Todo.deleteOne({ _id: todoId });

    if (result.deletedCount === 0) {
      return next(new ErrorHandler("Todo not found!", 404));
    }

    response.status(200).json({
      success: true,
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    response.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

exports.completeTodo = catchAsyncErrors(async (request, response, next) => {
  try {

    const todoId = request.params.id;
  
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return next(new ErrorHandler("Todo not found!", 404));
    }

    todo.isComplete = !todo.isComplete;
    await todo.save();
    response.status(200).json({
      success: true,
      message: `Todo ${todo.isComplete ? "Complete" : "Incomplete"} successfully!`,
    });
  } catch (error) {
    response.status(404).json({
      success: false,
      message: error.message,
    });
  }
});
