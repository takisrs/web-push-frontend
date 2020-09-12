<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <form method="POST">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" id="email" name="email" placeholder="Email..." class="form-control">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password..." class="form-control">
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-success" value="Submit"/>
                </div>
            </form>
        </div>
    </div>
</template>